import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../hooks/useTheme';

interface ParticleProps {
  count: number;
  color: string;
}

export function EnergyParticles({ count, color }: ParticleProps) {
  const { isDark } = useTheme();
  const mesh = useRef<THREE.Points>();
  const light = useRef<THREE.PointLight>();

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      temp[i3] = (Math.random() - 0.5) * 10;
      temp[i3 + 1] = Math.random() * 10;
      temp[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    return temp;
  }, [count]);

  const velocities = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.02,
      y: Math.random() * 0.02 + 0.02,
      z: (Math.random() - 0.5) * 0.02,
    }));
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] += velocities[i].x;
      positions[i3 + 1] += velocities[i].y;
      positions[i3 + 2] += velocities[i].z;

      // Reset particles that go too high
      if (positions[i3 + 1] > 5) {
        positions[i3 + 1] = -5;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Animate light
    if (light.current) {
      light.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <group>
      <pointLight
        ref={light}
        color={color}
        intensity={1}
        distance={10}
        decay={2}
        position={[0, 2, 0]}
      />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={color}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}