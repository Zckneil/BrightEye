import { useEffect, useRef } from 'react';
import nipplejs from 'nipplejs';
import { MutableRefObject } from 'react';

interface JoystickProps {
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  orbitControlsRef: MutableRefObject<any>;
}

const Joystick: React.FC<JoystickProps> = ({ theme, orbitControlsRef }) => {
  const joystickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !joystickRef.current) return;

    const manager = nipplejs.create({
      zone: joystickRef.current,
      mode: 'static',
      position: { left: '50%', top: '50%' },
      color: theme.primary,
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
  }, [theme, orbitControlsRef]);

  return (
    <div
      ref={joystickRef}
      className="absolute bottom-8 right-8 w-32 h-32 rounded-full backdrop-blur-xl pointer-events-auto z-50 transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, ${theme.background}, rgba(0,0,0,0.3))`,
        border: `2px solid ${theme.primary}40`,
        boxShadow: `0 4px 30px ${theme.primary}30, inset 0 2px 10px rgba(255,255,255,0.1)`,
        opacity: 0.8
      }}
    >
      {/* Joystick Label */}
      <div 
        className="absolute -top-7 left-0 w-full text-center text-xs font-light tracking-wider"
        style={{ 
          color: theme.primary,
          textShadow: `0 0 10px ${theme.primary}50`
        }}
      >
        Rotation Control
      </div>
      {/* Joystick Guide */}
      <div 
        className="absolute inset-4 rounded-full opacity-20"
        style={{
          border: `1px dashed ${theme.primary}`,
          background: `radial-gradient(circle, ${theme.primary}10 0%, transparent 70%)`
        }}
      />
    </div>
  );
};

export default Joystick; 