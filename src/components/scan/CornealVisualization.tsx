import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useHelper, Environment, useTexture, Text, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { DirectionalLightHelper, PointLightHelper, Vector3 } from 'three';
import dynamic from 'next/dynamic';

// Visualization modes
type VisualizationMode = 'surface' | 'wireframe' | 'contour' | 'ai-analysis';

// Client-side only joystick component
const Joystick = dynamic(() => import('./Joystick'), { ssr: false });

// Enhanced material uniforms
interface MaterialUniforms {
  [uniform: string]: THREE.IUniform<any>;
}

// Create uniforms with proper typing
const createUniforms = (): MaterialUniforms => ({
  time: { value: 0 },
  opacity: { value: 0.85 },
  refractionRatio: { value: 0.985 },
  fresnelBias: { value: 0.1 },
  fresnelScale: { value: 2.0 },
  fresnelPower: { value: 2.5 },
  sssIntensity: { value: 0.8 },
  sssRadius: { value: 0.5 },
  iridescenceScale: { value: 0.5 },
  tearFilmRipple: { value: 0.3 },
  normalScale: { value: 0.15 },
  displacementScale: { value: 0.1 },
  glowIntensity: { value: 0.8 },
  pulseSpeed: { value: 1.0 },
  environmentIntensity: { value: 0.5 },
  mode: { value: 0 },
  healthFactor: { value: 1 },
  topographyScale: { value: 1.0 },
  topographyContrast: { value: 1.2 },
  anomalyIntensity: { value: 0.0 },
  anomalyPosition: { value: new THREE.Vector2(0.5, 0.5) },
  anomalyRadius: { value: 0.2 },
  tearFilmThickness: { value: 0.01 },
  curvatureMap: { value: null },
  aiDetectionMap: { value: null },
  pupilSize: { value: 0.3 },
  irisColor: { value: new THREE.Vector3(0.3, 0.5, 0.8) },
  irisDetail: { value: 30.0 },
  irisRoughness: { value: 0.8 },
  pupilDilation: { value: 0.0 }
});

// Advanced cornea material with multi-mode rendering
const createAdvancedCorneaMaterial = () => {
  const uniforms = createUniforms();

  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vViewPosition;
      varying float vElevation;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        vUv = uv;
        vElevation = position.z;
        
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float opacity;
      uniform float refractionRatio;
      uniform float fresnelBias;
      uniform float fresnelScale;
      uniform float fresnelPower;
      uniform float sssIntensity;
      uniform float sssRadius;
      uniform float iridescenceScale;
      uniform float tearFilmRipple;
      uniform float normalScale;
      uniform float displacementScale;
      uniform float glowIntensity;
      uniform float pulseSpeed;
      uniform float environmentIntensity;
      uniform int mode;
      uniform float healthFactor;
      uniform float topographyScale;
      uniform float topographyContrast;
      uniform float anomalyIntensity;
      uniform vec2 anomalyPosition;
      uniform float anomalyRadius;
      uniform float tearFilmThickness;
      uniform sampler2D curvatureMap;
      uniform sampler2D aiDetectionMap;
      uniform float pupilSize;
      uniform vec3 irisColor;
      uniform float irisDetail;
      uniform float irisRoughness;
      uniform float pupilDilation;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vViewPosition;
      varying float vElevation;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;
      
      // Subsurface scattering approximation
      vec3 calculateSSS(vec3 viewDirection, vec3 normal, vec3 lightDir) {
        float sss = pow(max(0.0, dot(viewDirection, -lightDir)), 4.0) * sssRadius;
        sss += pow(max(0.0, dot(normal, -lightDir)), 2.0) * sssIntensity;
        return vec3(1.0, 0.7, 0.5) * sss;
      }
      
      // Enhanced iridescence with thin-film interference
      vec3 calculateIridescence(float cosTheta) {
        float thickness = (1.0 + sin(vUv.x * 20.0 + time)) * 0.5;
        vec3 baseIrid = vec3(
          sin(thickness * 6.28318 + 0.0) * 0.5 + 0.5,
          sin(thickness * 6.28318 + 2.0944) * 0.5 + 0.5,
          sin(thickness * 6.28318 + 4.18879) * 0.5 + 0.5
        );
        return mix(vec3(1.0), baseIrid, iridescenceScale * (1.0 - cosTheta));
      }
      
      // Dynamic tear film ripple effect
      float tearFilm(vec2 uv) {
        float ripple = sin(length(uv - 0.5) * 20.0 - time * 2.0) * 0.5 + 0.5;
        return ripple * tearFilmRipple;
      }
      
      // Enhanced Fresnel with anisotropic reflection
      float anisotropicFresnel(vec3 normal, vec3 viewDir, float roughness) {
        float NdotV = max(dot(normal, viewDir), 0.0);
        float fresnel = fresnelBias + fresnelScale * pow(1.0 - NdotV, fresnelPower);
        return fresnel * (1.0 + roughness * (1.0 - fresnel));
      }
      
      // Physical tear film interference
      vec3 tearFilmInterference(float thickness, vec3 normal, vec3 viewDir) {
        float cosTheta = abs(dot(normal, viewDir));
        float phi = 2.0 * 3.14159 * 2.0 * thickness / 550e-9; // wavelength of light
        
        // Wavelength-dependent phase shifts
        float phi_r = phi * 700.0/550.0; // red
        float phi_g = phi; // green
        float phi_b = phi * 400.0/550.0; // blue
        
        vec3 reflection = vec3(
          0.5 * (1.0 + cos(phi_r)),
          0.5 * (1.0 + cos(phi_g)),
          0.5 * (1.0 + cos(phi_b))
        );
        
        return reflection * (1.0 - cosTheta);
      }
      
      // Enhanced topography color mapping
      vec3 getTopographyColor(float height) {
        // Enhanced color mapping for better visualization
        vec3 colors[7] = vec3[7](
          vec3(0.0, 0.0, 1.0),   // Deep blue (flattest)
          vec3(0.0, 1.0, 1.0),   // Cyan
          vec3(0.0, 1.0, 0.0),   // Green
          vec3(1.0, 1.0, 0.0),   // Yellow
          vec3(1.0, 0.5, 0.0),   // Orange
          vec3(1.0, 0.0, 0.0),   // Red
          vec3(1.0, 0.0, 1.0)    // Magenta (steepest)
        );
        
        float scaledHeight = height * topographyScale * topographyContrast;
        float index = clamp(scaledHeight, 0.0, 1.0) * 6.0;
        int i = int(floor(index));
        float f = fract(index);
        
        return mix(colors[i], colors[min(i + 1, 6)], f);
      }
      
      // AI anomaly detection visualization
      float detectAnomaly(vec2 uv) {
        float dist = distance(uv, anomalyPosition);
        float anomaly = smoothstep(anomalyRadius + 0.1, anomalyRadius, dist);
        float pulse = sin(time * pulseSpeed) * 0.5 + 0.5;
        return anomaly * anomalyIntensity * pulse;
      }
      
      // Iris pattern generation
      float irisPattern(vec2 uv, float detail) {
        float pattern = 0.0;
        float scale = 1.0;
        float amp = 0.5;
        
        for (int i = 0; i < 3; i++) {
          pattern += (sin(uv.x * detail * scale + uv.y * detail * scale * 0.7) * 0.5 + 0.5) * amp;
          pattern += (cos(uv.y * detail * scale * 1.2 - uv.x * detail * scale * 0.3) * 0.5 + 0.5) * amp;
          scale *= 2.0;
          amp *= 0.5;
        }
        
        return pattern / 2.0;
      }
      
      // Radial iris coloration
      vec3 getIrisColor(vec2 uv, float dist) {
        float pattern = irisPattern(uv * 2.0, irisDetail);
        
        // Create radial color variation
        vec3 innerColor = irisColor * 1.2;
        vec3 outerColor = irisColor * 0.8;
        vec3 baseColor = mix(innerColor, outerColor, smoothstep(0.1, 0.9, dist));
        
        // Add detail variations
        float detail = pattern * irisRoughness;
        vec3 detailColor = mix(baseColor * 1.2, baseColor * 0.8, detail);
        
        return detailColor;
      }
      
      void main() {
        vec3 viewDirection = normalize(vViewPosition);
        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(vec3(5.0, 5.0, 5.0));
        
        // Base effects calculation
        float anisotropicFresnelFactor = anisotropicFresnel(normal, viewDirection, 0.2);
        vec3 sssColor = calculateSSS(viewDirection, normal, lightDir);
        vec3 tearInterference = tearFilmInterference(tearFilmThickness + tearFilm(vUv), normal, viewDirection);
        
        // Environment reflection
        vec3 envReflection = reflect(-viewDirection, normal);
        float envFresnel = pow(1.0 - max(0.0, dot(normal, viewDirection)), 3.0);
        
        // Base color with medical aesthetics
        vec3 baseColor = vec3(0.2, 0.8, 1.0);
        float healthModulation = sin(time * 0.5) * 0.1 + 0.9;
        
        vec3 finalColor;
        float finalOpacity = opacity;
        
        // Calculate distance from center for iris
        vec2 centeredUv = vUv * 2.0 - 1.0;
        float distFromCenter = length(centeredUv);
        
        if (mode == 0) { // Enhanced Physical Surface with Iris
          if (distFromCenter < 0.8) {
            // Iris
            vec3 irisCol = getIrisColor(centeredUv, distFromCenter / 0.8);
            vec3 surfaceColor = mix(baseColor, tearInterference, anisotropicFresnelFactor * 0.5);
            finalColor = irisCol * surfaceColor + sssColor * 0.3;
            finalColor *= (1.0 + tearFilm(vUv) * 0.3);
            finalOpacity = 1.0;
          } else {
            // Cornea
            vec3 surfaceColor = mix(baseColor, tearInterference, anisotropicFresnelFactor);
            finalColor = surfaceColor + sssColor;
            finalColor *= (1.0 + tearFilm(vUv));
          }
          
        } else if (mode == 1) { // Topography Map
          vec3 topographyColor = getTopographyColor(vElevation);
          finalColor = topographyColor;
          finalColor += sssColor * 0.2;
          finalOpacity = 0.9;
          
        } else if (mode == 2) { // AI Analysis
          float anomalyFactor = detectAnomaly(vUv);
          vec3 anomalyColor = vec3(1.0, 0.0, 0.0);
          finalColor = mix(baseColor, anomalyColor, anomalyFactor);
          finalColor += tearInterference * 0.3;
          
          float glowPulse = sin(time * 2.0) * 0.5 + 0.5;
          finalColor += anomalyColor * anomalyFactor * glowPulse;
        }
        
        // Add environment reflection and health modulation
        finalColor += envReflection * environmentIntensity * envFresnel;
        finalColor *= healthModulation * healthFactor;
        
        // Edge highlighting
        float edgeGlow = pow(1.0 - dot(normal, viewDirection), 4.0) * glowIntensity;
        finalColor += vec3(edgeGlow * 0.5);
        
        gl_FragColor = vec4(finalColor, finalOpacity);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });
};

// High-resolution cornea geometry
const generateHighResCorneaGeometry = (
  radius: number,
  segments: number,
  irregularity: number = 0,
  astigmatism: number = 0,
  keratoconus: number = 0
) => {
  const geometry = new THREE.SphereGeometry(
    radius,
    segments,
    segments,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.5
  );
  
  const positions = geometry.attributes.position;
  const uvs = geometry.attributes.uv;
  const normals = geometry.attributes.normal;
  
  // Adjust UV mapping to center the pupil
  for (let i = 0; i < uvs.count; i++) {
    const u = uvs.getX(i);
    const v = uvs.getY(i);
    
    // Center the UVs around the middle
    const centeredU = u * 2.0 - 1.0;
    const centeredV = v * 2.0 - 1.0;
    
    // Convert to polar coordinates
    const r = Math.sqrt(centeredU * centeredU + centeredV * centeredV);
    const theta = Math.atan2(centeredV, centeredU);
    
    // Map back to UV space
    uvs.setXY(
      i,
      (r * Math.cos(theta) + 1.0) * 0.5,
      (r * Math.sin(theta) + 1.0) * 0.5
    );
  }
  
  // Create detailed surface variations
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);
    
    const distance = Math.sqrt(x * x + y * y);
    const angle = Math.atan2(y, x);
    
    // Complex deformation patterns
    const baseDeform = Math.sin(distance * 5) * irregularity;
    const astigDeform = Math.sin(angle * 2) * Math.cos(distance * 3) * astigmatism;
    const keratDeform = Math.exp(-distance * 2) * keratoconus;
    
    // Micro-surface details
    const microDetail = (
      Math.sin(x * 50) * Math.sin(y * 50) * 0.01 +
      Math.cos(distance * 30) * 0.005
    );
    
    // Combined deformation
    const totalDeform = baseDeform + astigDeform + keratDeform + microDetail;
    
    positions.setXYZ(
      i,
      x * (1 + totalDeform),
      y * (1 + totalDeform),
      z + z * totalDeform * 0.5
    );
  }
  
  geometry.computeVertexNormals();
  return geometry;
};

// Main visualization component with enhanced features
interface CornealVisualizationProps {
  width?: string;
  height?: string;
  mode?: VisualizationMode;
  irregularity?: number;
  thickness?: number;
  astigmatism?: number;
  keratoconus?: number;
  healthFactor?: number;
  theme?: 'clinic' | 'futuristic' | 'sci-fi';
  onThemeChange?: (theme: 'clinic' | 'futuristic' | 'sci-fi') => void;
  onModeChange?: (mode: VisualizationMode) => void;
  anomalyPosition?: { x: number; y: number };
  anomalyRadius?: number;
  anomalyIntensity?: number;
}

export const CornealVisualization: React.FC<CornealVisualizationProps> = ({
  width = '100%',
  height = '1200px',
  mode = 'surface',
  irregularity = 0,
  thickness = 1,
  astigmatism = 0,
  keratoconus = 0,
  healthFactor = 1,
  theme = 'futuristic',
  onThemeChange,
  onModeChange,
  anomalyPosition,
  anomalyRadius,
  anomalyIntensity
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number; z: number } | null>(null);
  const [hoveredControl, setHoveredControl] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [uiOpacity, setUiOpacity] = useState(1);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [currentMode, setCurrentMode] = useState(mode);
  const orbitControlsRef = useRef<any>(null);
  
  // Dynamic theme colors based on mode and theme
  const themeColors = useMemo(() => {
    const baseColors = {
      clinic: {
        primary: '#2196f3',
        secondary: '#03a9f4',
        accent: '#00bcd4',
        background: 'rgba(255, 255, 255, 0.1)'
      },
      futuristic: {
        primary: '#00fff2',
        secondary: '#0984ff',
        accent: '#6b00ff',
        background: 'rgba(10, 20, 35, 0.4)'
      },
      'sci-fi': {
        primary: '#ff0099',
        secondary: '#00ff88',
        accent: '#6e00ff',
        background: 'rgba(20, 10, 30, 0.5)'
      }
    };
    return baseColors[theme];
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle camera movement to adjust UI opacity
  const handleCameraMove = useCallback((state: any) => {
    const distance = state.camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
    const opacity = Math.max(0.2, Math.min(1, (distance - 2) / 3));
    setUiOpacity(opacity);
  }, []);

  // Enhanced tooltip handling
  const handleControlHover = useCallback((control: string, event: React.MouseEvent) => {
    setHoveredControl(control);
    setShowTooltip(true);
    setTooltipContent(control);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  }, []);

  // Handle theme change
  const handleThemeChange = useCallback((newTheme: 'clinic' | 'futuristic' | 'sci-fi') => {
    setCurrentTheme(newTheme);
  }, []);

  // Handle mode change
  const handleModeChange = useCallback((newMode: VisualizationMode) => {
    setCurrentMode(newMode);
  }, []);

  // Enhanced camera controls
  const CameraController = useMemo(() => {
    const Controller: React.FC<{ onCameraMove: (state: any) => void }> = ({ onCameraMove }) => {
      const { camera, gl } = useThree();
      
      useFrame((state) => {
        onCameraMove(state);
      });
      
      useEffect(() => {
        camera.position.set(0, 0, 4);
        camera.lookAt(0, 0, 0);
      }, [camera]);
      
      return (
        <OrbitControls
          ref={orbitControlsRef}
          makeDefault
          camera={camera}
          domElement={gl.domElement}
          enableDamping={true}
          dampingFactor={0.05}
          minDistance={0.5}
          maxDistance={12}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          rotateSpeed={0.8}
          zoomSpeed={1.2}
          panSpeed={0.8}
        />
      );
    };
    
    return Controller;
  }, []);

  // Memoized Cornea component
  const Cornea = useMemo(() => {
    const CornealMesh: React.FC<{
      mode: VisualizationMode;
      irregularity: number;
      thickness: number;
      astigmatism: number;
      keratoconus: number;
      healthFactor: number;
      anomalyPosition?: { x: number; y: number };
      anomalyRadius?: number;
      anomalyIntensity?: number;
    }> = ({
      mode,
      irregularity,
      thickness,
      astigmatism,
      keratoconus,
      healthFactor,
      anomalyPosition,
      anomalyRadius,
      anomalyIntensity
    }) => {
      const meshRef = useRef<THREE.Mesh>(null);
      const mainLightRef = useRef<THREE.DirectionalLight>(null);
      const rimLightRef = useRef<THREE.PointLight>(null);
      const fillLightRef = useRef<THREE.PointLight>(null);
      
      const modeValue = useMemo(() => {
        const modes: Record<VisualizationMode, number> = {
          'surface': 0,
          'wireframe': 1,
          'contour': 2,
          'ai-analysis': 3
        };
        return modes[mode];
      }, [mode]);

      useFrame(({ clock }) => {
        if (meshRef.current) {
          const material = meshRef.current.material as THREE.ShaderMaterial;
          material.uniforms.time.value = clock.getElapsedTime();
          material.uniforms.healthFactor.value = healthFactor;
          material.uniforms.mode.value = modeValue;
          material.uniforms.anomalyPosition.value.set(
            anomalyPosition?.x ?? 0.5,
            anomalyPosition?.y ?? 0.5
          );
          material.uniforms.anomalyRadius.value = anomalyRadius ?? 0.2;
          material.uniforms.anomalyIntensity.value = anomalyIntensity ?? 0;
          material.uniforms.glowIntensity.value = 0.8 + Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
          material.uniforms.pulseSpeed.value = 1.0 + Math.sin(clock.getElapsedTime() * 0.2) * 0.3;
          
          // Subtle natural movement
          meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.02;
          meshRef.current.rotation.y = Math.cos(clock.getElapsedTime() * 0.2) * 0.02;
          
          // Add pupil dilation animation
          const pulseSpeed = 0.5;
          const dilationAmount = Math.sin(clock.getElapsedTime() * pulseSpeed) * 0.1;
          material.uniforms.pupilDilation.value = Math.max(0, dilationAmount);
          
          // Subtle iris color variation
          const hueShift = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
          material.uniforms.irisColor.value.setX(0.3 + hueShift);
        }
      });

      return (
        <group rotation={[0, 0, 0]}>
          <directionalLight
            ref={mainLightRef}
            position={[5, 5, 5]}
            intensity={1.2}
            castShadow
          />
          <pointLight
            ref={rimLightRef}
            position={[-3, 2, 4]}
            intensity={0.8}
            color="#00ffff"
          />
          <pointLight
            ref={fillLightRef}
            position={[2, -3, 3]}
            intensity={0.6}
            color="#7ab8ff"
          />
          
          <mesh
            ref={meshRef}
            geometry={generateHighResCorneaGeometry(1, 256, irregularity, astigmatism, keratoconus)}
            material={createAdvancedCorneaMaterial()}
            scale={[1, 1, thickness]}
            castShadow
            receiveShadow
            rotation={[-Math.PI * 0.5, 0, 0]}
          />
          
          <group position={[0, 0, 0]}>
            <gridHelper args={[8, 80, '#1a4a7a', '#0a1f35']} />
            <Text
              position={[4.2, 0, 0]}
              rotation={[0, 0, 0]}
              fontSize={0.15}
              color="#4a9eff"
            >
              4mm
            </Text>
          </group>
        </group>
      );
    };
    
    return CornealMesh;
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4 py-8">
          <div
            style={{ width, height }}
            className="flex items-center justify-center bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-xl overflow-hidden"
          >
            <div className="space-y-4 text-center">
              <div className="text-2xl font-light text-white/90 animate-pulse">
                Initializing Advanced 3D Visualization
              </div>
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-blue-500/50 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <button
          onClick={() => window.location.href = '/'}
          className="mb-6 px-4 py-2 flex items-center space-x-2 text-white/90 hover:text-white transition-colors rounded-lg bg-white/5 hover:bg-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back to Home</span>
        </button>

        <div style={{ width, height }} className="relative group">
          <Canvas
            shadows
            frameloop="always"
            camera={{ position: [0, 0, 4], fov: 45 }}
            style={{ background: 'transparent' }}
          >
            <CameraController onCameraMove={handleCameraMove} />
            <Environment preset="studio" />
            <Cornea
              mode={currentMode}
              irregularity={irregularity}
              thickness={thickness}
              astigmatism={astigmatism}
              keratoconus={keratoconus}
              healthFactor={healthFactor}
              anomalyPosition={anomalyPosition}
              anomalyRadius={anomalyRadius}
              anomalyIntensity={anomalyIntensity}
            />
            
            {/* Dynamic background effects */}
            {currentTheme === 'sci-fi' && (
              <group>
                {Array.from({ length: 50 }).map((_, i) => (
                  <mesh
                    key={i}
                    position={[
                      Math.random() * 10 - 5,
                      Math.random() * 10 - 5,
                      Math.random() * 10 - 15
                    ]}
                  >
                    <boxGeometry args={[0.05, 0.05, 0.05]} />
                    <meshBasicMaterial
                      color={themeColors.accent}
                      transparent
                      opacity={0.3}
                    />
                  </mesh>
                ))}
              </group>
            )}
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default CornealVisualization;