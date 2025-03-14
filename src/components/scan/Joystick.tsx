import { useEffect, useRef } from 'react';
import nipplejs, { JoystickManager, EventData, JoystickManagerOptions } from 'nipplejs';
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

interface JoystickProps {
  orbitControlsRef: React.MutableRefObject<OrbitControlsImpl | null>;
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

export default function Joystick({ orbitControlsRef, theme }: JoystickProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const joystickRef = useRef<JoystickManager | null>(null);
  const moveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const options: JoystickManagerOptions = {
      zone: containerRef.current,
      mode: 'static',
      position: { left: '50%', top: '50%' },
      color: theme?.primary || '#3B82F6',
      size: 100
    };

    joystickRef.current = nipplejs.create(options);

    const manager = joystickRef.current;

    manager.on('start', () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }
    });

    manager.on('move', (_, data) => {
      if (!orbitControlsRef.current) return;

      const force = data.force < 2 ? data.force : 2;
      const maxSpeed = 0.05;
      const deltaX = -(data.vector.x * force * maxSpeed);
      const deltaY = data.vector.y * force * maxSpeed;

      // Clear existing interval
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }

      // Create new interval for smooth rotation
      moveIntervalRef.current = setInterval(() => {
        if (!orbitControlsRef.current) return;

        // Update the camera rotation using spherical coordinates
        const controls = orbitControlsRef.current;
        
        // Get current spherical coordinates
        const spherical = new THREE.Spherical().setFromVector3(
          new THREE.Vector3().subVectors(
            controls.object.position,
            controls.target
          )
        );

        // Update angles
        spherical.theta -= deltaX; // Rotate around Y axis
        spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi + deltaY)); // Rotate around X axis

        // Convert back to Cartesian coordinates
        const newPosition = new THREE.Vector3().setFromSpherical(spherical);
        controls.object.position.copy(newPosition.add(controls.target));
        controls.object.lookAt(controls.target);
        
        controls.update();
      }, 16);
    });

    manager.on('end', () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = '0.5';
      }
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
        moveIntervalRef.current = null;
      }
    });

    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }
      manager.destroy();
    };
  }, [orbitControlsRef, theme]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 right-8 w-32 h-32 bg-black/20 backdrop-blur-lg rounded-full border border-white/10 opacity-50 transition-opacity duration-200"
      style={{
        background: `radial-gradient(circle at center, ${theme?.background || '#1a1a1a'}00, ${
          theme?.background || '#1a1a1a'
        }40)`,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-xs text-white/50">Camera Control</span>
      </div>
    </div>
  );
} 