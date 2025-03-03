import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { DirectionalLightHelper, PointLightHelper } from 'three';

// Custom hook for smooth value transitions
const useSmoothTransition = (target: number, speed = 0.1) => {
  const current = useRef(target);
  
  useEffect(() => {
    current.current = target;
  }, [target]);
  
  return (delta: number) => {
    const diff = target - current.current;
    if (Math.abs(diff) < 0.001) return target;
    current.current += diff * speed * delta * 60;
    return current.current;
  };
};

// Cornea material with custom shading
const corneaMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    opacity: { value: 0.6 },
    refractionRatio: { value: 0.98 },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 2.0 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform float opacity;
    uniform float refractionRatio;
    uniform float fresnelBias;
    uniform float fresnelScale;
    uniform float fresnelPower;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = fresnelBias + fresnelScale * pow(1.0 + dot(viewDirection, normal), fresnelPower);
      
      // Create iridescent effect
      vec3 baseColor = vec3(0.4, 0.6, 0.8);
      vec3 iridescence = vec3(
        sin(vUv.x * 10.0 + time) * 0.5 + 0.5,
        cos(vUv.y * 8.0 + time * 0.7) * 0.5 + 0.5,
        sin((vUv.x + vUv.y) * 12.0 + time * 1.3) * 0.5 + 0.5
      );
      
      vec3 finalColor = mix(baseColor, iridescence, fresnel);
      gl_FragColor = vec4(finalColor, opacity);
    }
  `,
  transparent: true,
  side: THREE.DoubleSide,
});

// Cornea geometry generation
const generateCorneaGeometry = (
  radius: number,
  segments: number,
  irregularity: number = 0
) => {
  const geometry = new THREE.SphereGeometry(radius, segments, segments, 0, Math.PI);
  const positions = geometry.attributes.position;
  
  // Apply irregularities to simulate corneal conditions
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);
    
    const distance = Math.sqrt(x * x + y * y);
    const deformation = Math.sin(distance * 5) * irregularity;
    
    positions.setXYZ(
      i,
      x + x * deformation,
      y + y * deformation,
      z + z * deformation
    );
  }
  
  geometry.computeVertexNormals();
  return geometry;
};

// Cornea component
const Cornea = ({ irregularity = 0, thickness = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  
  // Debug helpers
  useHelper(lightRef as React.MutableRefObject<THREE.DirectionalLight>, DirectionalLightHelper, 1, 'red');
  useHelper(pointLightRef as React.MutableRefObject<THREE.PointLight>, PointLightHelper, 0.5, 'blue');
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Update shader uniforms
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = clock.getElapsedTime();
    }
  });
  
  return (
    <group>
      <directionalLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={1}
        castShadow
      />
      <pointLight
        ref={pointLightRef}
        position={[-3, 2, 4]}
        intensity={0.8}
      />
      <mesh
        ref={meshRef}
        geometry={generateCorneaGeometry(1, 64, irregularity)}
        material={corneaMaterial}
        scale={[1, 1, thickness]}
      >
        <meshPhongMaterial
          attach="material-back"
          color="#ffffff"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Camera controls
const CameraController = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  return <OrbitControls enableDamping dampingFactor={0.05} />;
};

// Main visualization component
interface CornealVisualizationProps {
  width?: string;
  height?: string;
  irregularity?: number;
  thickness?: number;
}

export const CornealVisualization: React.FC<CornealVisualizationProps> = ({
  width = '100%',
  height = '600px',
  irregularity = 0,
  thickness = 1,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading of patient data
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div
        style={{ width, height }}
        className="flex items-center justify-center bg-gray-100"
      >
        <div className="text-lg text-gray-600">Loading visualization...</div>
      </div>
    );
  }
  
  return (
    <div style={{ width, height }} className="relative">
      <Canvas shadows>
        <CameraController />
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        <ambientLight intensity={0.4} />
        <Cornea irregularity={irregularity} thickness={thickness} />
      </Canvas>
      
      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg">
        <div className="text-sm text-gray-700">
          <p>Use mouse to rotate and zoom:</p>
          <ul className="list-disc list-inside mt-1">
            <li>Left click + drag to rotate</li>
            <li>Right click + drag to pan</li>
            <li>Scroll to zoom</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CornealVisualization; 