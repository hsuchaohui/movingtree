import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS, CONSTANTS } from '../constants';

const { GOLD_METALLIC, EMERALD_DEEP, EMERALD_LIGHT, RED_VELVET } = COLORS;

const Ornament = ({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Subtle rotation for ornaments
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime + position[1]) * 0.1;
    }
  });

  return (
    <mesh position={position} ref={meshRef} castShadow receiveShadow>
      <icosahedronGeometry args={[0.25 * scale, 1]} />
      <meshStandardMaterial 
        color={color} 
        metalness={1} 
        roughness={0.1} 
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

export const Tree: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Rotate the entire tree slowly
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const levels = useMemo(() => {
    const segments: { position: [number, number, number]; scale: [number, number, number] }[] = [];
    const height = CONSTANTS.TREE_HEIGHT;
    const levelCount = CONSTANTS.TREE_LEVELS;

    for (let i = 0; i < levelCount; i++) {
      const scale = 1 - i / (levelCount + 1);
      const y = -height / 2 + i * (height / levelCount) * 1.2;
      segments.push({ position: [0, y, 0], scale: [scale * 2.5, 1.5, scale * 2.5] });
    }
    return segments;
  }, []);

  const ornaments = useMemo(() => {
    const items: { position: [number, number, number]; color: string; scale: number }[] = [];
    const count = CONSTANTS.ORNAMENT_COUNT;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < count; i++) {
      const y = -CONSTANTS.TREE_HEIGHT / 2 + (i / count) * CONSTANTS.TREE_HEIGHT;
      const radius = 2.2 * (1 - (i / count)); // Tapering radius
      const theta = 2 * Math.PI * i * goldenRatio;
      
      const x = radius * Math.cos(theta);
      const z = radius * Math.sin(theta);
      
      // Mix of Gold and Velvet Red ornaments
      const isGold = Math.random() > 0.3;
      items.push({
        position: [x, y, z],
        color: isGold ? GOLD_METALLIC : RED_VELVET,
        scale: Math.random() * 0.5 + 0.5
      });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Tree Body - Cones */}
      {levels.map((level, i) => (
        <mesh key={i} position={level.position} castShadow receiveShadow>
          <coneGeometry args={[level.scale[0], level.scale[1], 32]} />
          <meshStandardMaterial 
            color={EMERALD_DEEP} 
            roughness={0.7} 
            metalness={0.2} 
            flatShading={false}
          />
        </mesh>
      ))}

      {/* Ornaments */}
      {ornaments.map((o, i) => (
        <Ornament key={`orn-${i}`} position={o.position} color={o.color} scale={o.scale} />
      ))}

      {/* The Star */}
      <mesh position={[0, CONSTANTS.TREE_HEIGHT / 2 + 0.5, 0]}>
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial 
          color={GOLD_METALLIC} 
          emissive={GOLD_METALLIC} 
          emissiveIntensity={2} 
          toneMapped={false} 
        />
        <pointLight intensity={2} distance={5} color={GOLD_METALLIC} />
      </mesh>

      {/* Spiraling Ribbon (Visualized as small particles) */}
       {Array.from({ length: 100 }).map((_, i) => {
         const t = i / 100;
         const angle = t * Math.PI * 10;
         const y = -3.5 + t * 7;
         const r = 2.6 * (1 - t) + 0.2;
         return (
            <mesh key={`ribbon-${i}`} position={[r * Math.cos(angle), y, r * Math.sin(angle)]}>
               <sphereGeometry args={[0.05]} />
               <meshBasicMaterial color={COLORS.GOLD_HIGHLIGHT} />
            </mesh>
         )
       })}
    </group>
  );
};