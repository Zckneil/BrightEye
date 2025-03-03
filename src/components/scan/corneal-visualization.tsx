"use client"

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useHelper } from '@react-three/drei'
import * as THREE from 'three'

interface CornealVisualizationProps {
  scanData?: any
  width?: string
  height?: string
}

function CornealModel({ scanData }: { scanData?: any }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.DirectionalLight>(null)
  
  // Optional: Uncomment to show light helper
  // useHelper(lightRef, THREE.DirectionalLightHelper, 1, 'red')
  
  useFrame(() => {
    if (meshRef.current) {
      // Add subtle animation if desired
      // meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        ref={lightRef}
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow 
      />
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[2, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial 
          color="#00c8ff" 
          transparent 
          opacity={0.7} 
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      <gridHelper args={[10, 10, '#888888', '#444444']} />
    </>
  )
}

export default function CornealVisualization({ 
  scanData, 
  width = "100%", 
  height = "500px" 
}: CornealVisualizationProps) {
  return (
    <div style={{ width, height }}>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <CornealModel scanData={scanData} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  )
}
