import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useHelper, Environment, useTexture, Text, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { DirectionalLightHelper, PointLightHelper, Vector3 } from 'three';
import nipplejs from 'nipplejs';

// Visualization modes
type VisualizationMode = 'surface' | 'wireframe' | 'contour' | 'ai-analysis';

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
  healthFactor: { value: 1 }
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
      
      void main() {
        vec3 viewDirection = normalize(vViewPosition);
        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(vec3(5.0, 5.0, 5.0));
        
        // Calculate base effects
        float anisotropicFresnelFactor = anisotropicFresnel(normal, viewDirection, 0.2);
        vec3 sssColor = calculateSSS(viewDirection, normal, lightDir);
        vec3 iridescenceColor = calculateIridescence(dot(normal, viewDirection));
        float tearRipple = tearFilm(vUv);
        
        // Dynamic environment reflection
        vec3 envReflection = reflect(-viewDirection, normal);
        float envFresnel = pow(1.0 - max(0.0, dot(normal, viewDirection)), 3.0);
        
        // Base color with medical aesthetics
        vec3 baseColor = vec3(0.2, 0.8, 1.0);
        float healthModulation = sin(time * 0.5) * 0.1 + 0.9;
        
        vec3 finalColor;
        float finalOpacity = opacity;
        
        if (mode == 0) { // Enhanced Surface Map with SSS
          vec3 surfaceColor = mix(baseColor, iridescenceColor, anisotropicFresnelFactor);
          finalColor = surfaceColor + sssColor;
          finalColor *= (1.0 + tearRipple);
          
        } else if (mode == 1) { // Enhanced Wireframe with holographic effect
          float gridLine = max(
            abs(fract(vUv.x * 20.0) - 0.5),
            abs(fract(vUv.y * 20.0) - 0.5)
          );
          gridLine = smoothstep(0.1, 0.05, gridLine);
          vec3 gridColor = mix(
            vec3(0.1, 0.4, 0.8),
            vec3(1.0) + iridescenceColor,
            gridLine
          );
          finalColor = gridColor + sssColor * 0.3;
          finalOpacity = mix(0.1, 1.0, gridLine);
          
        } else if (mode == 2) { // Enhanced Contour with neon glow
          float elevation = vElevation * displacementScale;
          float contour = abs(fract(elevation * 10.0) - 0.5);
          contour = smoothstep(0.1, 0.0, contour);
          vec3 glowColor = vec3(0.0, 1.0, 1.0) * glowIntensity;
          finalColor = mix(baseColor * 0.5, glowColor, contour);
          finalColor += sssColor * 0.2;
          
        } else { // Enhanced AI Analysis with cyberpunk effects
          vec3 anomalyColor = vec3(1.0, 0.2, 0.0);
          float anomalyPattern = sin(vUv.x * 30.0) * sin(vUv.y * 30.0) * 0.5 + 0.5;
          float pulse = sin(time * pulseSpeed + anomalyPattern * 10.0) * 0.5 + 0.5;
          finalColor = mix(baseColor, anomalyColor, anomalyPattern * pulse);
          finalColor += iridescenceColor * 0.3 + sssColor * 0.2;
        }
        
        // Add environment reflection and final effects
        finalColor += envReflection * environmentIntensity * envFresnel;
        finalColor *= healthModulation * healthFactor;
        
        // Add depth-based effects
        float depth = 1.0 - pow(dot(normal, viewDirection), 2.0);
        float edgeGlow = pow(1.0 - dot(normal, viewDirection), 4.0) * glowIntensity;
        finalColor += vec3(edgeGlow * 0.5);
        
        gl_FragColor = vec4(finalColor, finalOpacity * (0.8 + depth * 0.2));
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
}

export const CornealVisualization: React.FC<CornealVisualizationProps> = ({
  width = '100%',
  height = '600px',
  mode = 'surface',
  irregularity = 0,
  thickness = 1,
  astigmatism = 0,
  keratoconus = 0,
  healthFactor = 1,
  theme = 'futuristic',
  onThemeChange,
  onModeChange
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
  const joystickRef = useRef<HTMLDivElement>(null);
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

  // Initialize joystick
  useEffect(() => {
    if (!joystickRef.current) return;

    const manager = nipplejs.create({
      zone: joystickRef.current,
      mode: 'static',
      position: { left: '50%', top: '50%' },
      color: themeColors.primary,
      size: 100,
      dynamicPage: true,
      multitouch: false,
      maxNumberOfNipples: 1,
      dataOnly: false,
      restJoystick: true,
      restOpacity: 0.5,
      threshold: 0.1
    });

    let moveInterval: NodeJS.Timeout | null = null;

    manager.on('start', () => {
      if (joystickRef.current) {
        joystickRef.current.style.opacity = '1';
      }
    });

    manager.on('move', (evt, data) => {
      if (orbitControlsRef.current && data.vector) {
        const rotationSpeed = 0.03;
        const deltaX = -data.vector.x * rotationSpeed * data.force;
        const deltaY = -data.vector.y * rotationSpeed * data.force;

        if (moveInterval) clearInterval(moveInterval);
        moveInterval = setInterval(() => {
          orbitControlsRef.current.rotateLeft(deltaX);
          orbitControlsRef.current.rotateUp(deltaY);
        }, 16);
      }
    });

    manager.on('end', () => {
      if (moveInterval) {
        clearInterval(moveInterval);
        moveInterval = null;
      }
      if (joystickRef.current) {
        joystickRef.current.style.opacity = '0.8';
      }
    });

    return () => {
      if (moveInterval) clearInterval(moveInterval);
      manager.destroy();
    };
  }, [themeColors]);

  // Enhanced camera controls with joystick support
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
          minDistance={2}
          maxDistance={8}
          minPolarAngle={Math.PI * 0.1}
          maxPolarAngle={Math.PI * 0.9}
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
    }> = ({
      mode,
      irregularity,
      thickness,
      astigmatism,
      keratoconus,
      healthFactor
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
          material.uniforms.glowIntensity.value = 0.8 + Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
          material.uniforms.pulseSpeed.value = 1.0 + Math.sin(clock.getElapsedTime() * 0.2) * 0.3;
          
          // Subtle natural movement
          meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.02;
          meshRef.current.rotation.y = Math.cos(clock.getElapsedTime() * 0.2) * 0.02;
        }
      });

      return (
        <group rotation={[Math.PI * 0.5, 0, 0]}>
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
          />
          
          <group position={[0, 0, 0]}>
            <gridHelper args={[4, 40, '#1a4a7a', '#0a1f35']} />
            <Text
              position={[2.2, 0, 0]}
              rotation={[0, 0, 0]}
              fontSize={0.15}
              color="#4a9eff"
            >
              2mm
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
      <div className="container mx-auto px-4 py-8">
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

          {/* Virtual Joystick */}
          <div
            ref={joystickRef}
            className="absolute bottom-8 right-8 w-32 h-32 rounded-full backdrop-blur-xl pointer-events-auto z-50 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${themeColors.background}, rgba(0,0,0,0.3))`,
              border: `2px solid ${themeColors.primary}40`,
              boxShadow: `0 4px 30px ${themeColors.primary}30, inset 0 2px 10px rgba(255,255,255,0.1)`,
              opacity: 0.8
            }}
          >
            {/* Joystick Label */}
            <div 
              className="absolute -top-7 left-0 w-full text-center text-xs font-light tracking-wider"
              style={{ 
                color: themeColors.primary,
                textShadow: `0 0 10px ${themeColors.primary}50`
              }}
            >
              Rotation Control
            </div>
            {/* Joystick Guide */}
            <div 
              className="absolute inset-4 rounded-full opacity-20"
              style={{
                border: `1px dashed ${themeColors.primary}`,
                background: `radial-gradient(circle, ${themeColors.primary}10 0%, transparent 70%)`
              }}
            />
          </div>

          {/* Glassmorphic UI Overlay - Make controls clickable but not block joystick */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: uiOpacity }}
          >
            {/* Top Bar */}
            <div
              className="absolute top-4 left-4 right-4 p-4 rounded-xl backdrop-blur-xl transition-all duration-300 pointer-events-auto"
              style={{
                background: themeColors.background,
                borderBottom: `1px solid ${themeColors.primary}20`,
                boxShadow: `0 4px 30px ${themeColors.primary}10`,
                zIndex: 40
              }}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-light" style={{ color: themeColors.primary }}>
                  Corneal Analysis
                </h2>
                <div className="flex space-x-4">
                  {['clinic', 'futuristic', 'sci-fi'].map((t) => (
                    <button
                      key={t}
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                        currentTheme === t ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                      style={{ color: themeColors.primary }}
                      onClick={() => handleThemeChange(t as 'clinic' | 'futuristic' | 'sci-fi')}
                      onMouseEnter={(e) => handleControlHover(`Theme: ${t}`, e)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Side Controls */}
            <div
              className="absolute top-24 right-4 w-64 p-4 rounded-xl backdrop-blur-xl transition-all duration-300 pointer-events-auto"
              style={{
                background: themeColors.background,
                border: `1px solid ${themeColors.secondary}20`,
                boxShadow: `0 4px 30px ${themeColors.secondary}10`,
                zIndex: 40
              }}
            >
              <div className="space-y-4">
                {['surface', 'wireframe', 'contour', 'ai-analysis'].map((m) => (
                  <button
                    key={m}
                    className={`w-full px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                      currentMode === m
                        ? 'bg-white/10 shadow-lg'
                        : 'hover:bg-white/5'
                    }`}
                    style={{
                      color: currentMode === m ? themeColors.accent : themeColors.primary,
                      borderLeft: `2px solid ${
                        currentMode === m ? themeColors.accent : 'transparent'
                      }`
                    }}
                    onClick={() => handleModeChange(m as VisualizationMode)}
                    onMouseEnter={(e) => handleControlHover(`Mode: ${m}`, e)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    {m.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Info Panel */}
            <div
              className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-xl transition-all duration-300 pointer-events-auto"
              style={{
                background: themeColors.background,
                borderTop: `1px solid ${themeColors.secondary}20`,
                boxShadow: `0 4px 30px ${themeColors.secondary}10`,
                zIndex: 40,
                marginRight: '160px' // Make space for joystick
              }}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium" style={{ color: themeColors.primary }}>
                    Interactive Controls
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-xs" style={{ color: themeColors.secondary }}>
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10">
                        🔄
                      </span>
                      <span>Rotate View</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10">
                        ↔️
                      </span>
                      <span>Pan View</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10">
                        🔍
                      </span>
                      <span>Zoom</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10">
                        📏
                      </span>
                      <span>Measure</span>
                    </div>
                  </div>
                </div>

                {selectedPoint && (
                  <div
                    className="p-3 rounded-lg"
                    style={{ background: themeColors.background }}
                  >
                    <h3 className="text-sm font-medium mb-2" style={{ color: themeColors.primary }}>
                      Selected Point
                    </h3>
                    <div className="grid grid-cols-3 gap-3 text-xs" style={{ color: themeColors.secondary }}>
                      <div>X: {selectedPoint.x.toFixed(3)}mm</div>
                      <div>Y: {selectedPoint.y.toFixed(3)}mm</div>
                      <div>Z: {selectedPoint.z.toFixed(3)}mm</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Tooltip */}
        {showTooltip && (
          <div
            className="absolute pointer-events-none px-3 py-1.5 rounded-lg text-xs backdrop-blur-xl transition-all duration-300"
            style={{
              left: tooltipPosition.x + 10,
              top: tooltipPosition.y - 20,
              background: themeColors.background,
              color: themeColors.primary,
              border: `1px solid ${themeColors.accent}20`,
              boxShadow: `0 4px 20px ${themeColors.accent}20`
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default CornealVisualization;