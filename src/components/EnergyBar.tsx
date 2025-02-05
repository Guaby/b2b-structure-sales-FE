import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { energyVertexShader, energyFragmentShader } from '../shaders/EnergyShader';
import { useTheme } from '../hooks/useTheme';

const EnergyMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(),
    uIntensity: 0,
  },
  energyVertexShader,
  energyFragmentShader
);

interface EnergyBarProps {
  height: number;
  color: string;
  position: [number, number, number];
  delay?: number;
}

export function EnergyBar({ height, color, position, delay = 0 }: EnergyBarProps) {
  const meshRef = useRef<THREE.Mesh>();
  const materialRef = useRef<any>();
  const { isDark } = useTheme();

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uColor = new THREE.Color(color);
    }
  }, [color]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.3;
    }

    if (meshRef.current) {
      meshRef.current.scale.y = THREE.MathUtils.lerp(
        meshRef.current.scale.y,
        height,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[1, 0.001, 1]}>
      <boxGeometry args={[1, 1, 1]} />
      <primitive object={new EnergyMaterial()} ref={materialRef} />
    </mesh>
  );
}