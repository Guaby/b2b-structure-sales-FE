import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Text, 
  Environment, 
  Effects,
  PerspectiveCamera
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { EnergyBar } from './EnergyBar';
import { EnergyParticles } from './EnergyParticles';

interface ComparisonData {
  current: {
    monthlyBill: number;
    yearlyConsumption: number;
    twentyFiveYearCost: number;
  };
  solar: {
    monthlyBill: number;
    yearlyProduction: number;
    twentyFiveYearSavings: number;
    systemCost: number;
  };
}

interface EnergyComparisonProps {
  data: ComparisonData;
}

function Scene({ data }: { data: ComparisonData }) {
  const maxValue = Math.max(
    data.current.twentyFiveYearCost,
    data.solar.twentyFiveYearSavings + data.solar.systemCost
  );
  const scale = 5 / maxValue;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
      <Environment preset="night" />
      
      {/* Current Energy Cost Bar */}
      <group position={[-2.5, 0, 0]}>
        <EnergyBar
          height={data.current.twentyFiveYearCost * scale}
          color="#ef4444"
          position={[0, 0, 0]}
          delay={0}
        />
        <EnergyParticles count={1000} color="#ef4444" />
        <Text
          position={[0, data.current.twentyFiveYearCost * scale + 0.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="bottom"
        >
          Without Solar{'\n'}
          ${(data.current.twentyFiveYearCost / 1000).toFixed(0)}k
        </Text>
      </group>

      {/* Solar Energy Cost Bar */}
      <group position={[2.5, 0, 0]}>
        <EnergyBar
          height={data.solar.twentyFiveYearSavings * scale}
          color="#22c55e"
          position={[0, 0, 0]}
          delay={Math.PI}
        />
        <EnergyParticles count={1000} color="#22c55e" />
        <Text
          position={[0, data.solar.twentyFiveYearSavings * scale + 0.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="bottom"
        >
          With Solar{'\n'}
          ${(data.solar.twentyFiveYearSavings / 1000).toFixed(0)}k
        </Text>
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={0.5}
      />

      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          height={300}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.002, 0.002]}
        />
      </EffectComposer>
    </>
  );
}

export function EnergyComparison({ data }: EnergyComparisonProps) {
  return (
    <div className="h-[600px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl overflow-hidden">
      <Canvas>
        <Suspense fallback={null}>
          <Scene data={data} />
        </Suspense>
      </Canvas>
    </div>
  );
}