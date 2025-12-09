import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Sparkles, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { Tree } from './Tree';
import { Effects } from './Effects';
import { COLORS } from '../constants';

const RotatingCamera = () => {
    // Subtle camera movement to make the scene feel alive even when static
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        state.camera.position.x = Math.sin(t * 0.1) * 10;
        state.camera.position.z = Math.cos(t * 0.1) * 10;
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

export const Scene: React.FC = () => {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ antialias: false, toneMappingExposure: 1.5 }}>
      <PerspectiveCamera makeDefault position={[8, 2, 8]} fov={45} />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} color={COLORS.EMERALD_LIGHT} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.5} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        color={COLORS.GOLD_HIGHLIGHT} 
      />
      <pointLight position={[-10, -5, -10]} intensity={1} color={COLORS.RED_VELVET} />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Main Content */}
      <group position={[0, -1, 0]}>
        <Tree />
        <ContactShadows opacity={0.7} scale={20} blur={2.5} far={4} color="#000000" />
      </group>

      {/* Atmosphere */}
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.5} color={COLORS.GOLD_HIGHLIGHT} />
      
      {/* Post Processing */}
      <Effects />

      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minPolarAngle={Math.PI / 2.5} 
        maxPolarAngle={Math.PI / 1.8}
        minDistance={5}
        maxDistance={20}
        autoRotate={false}
      />
    </Canvas>
  );
};