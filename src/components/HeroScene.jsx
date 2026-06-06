import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import NeuralNetwork from './three/NeuralNetwork';
import EmbeddingCloud from './three/EmbeddingCloud';
import Particles from './three/Particles';
import TechOrbit from './three/TechOrbit';
import { useMobileDetect } from '../hooks/useMobileDetect';

export default function HeroScene({ mouse }) {
  const { isMobile, isTablet } = useMobileDetect();
  const normalizedMouse = {
    x: mouse.x / (typeof window !== 'undefined' ? window.innerWidth : 1),
    y: mouse.y / (typeof window !== 'undefined' ? window.innerHeight : 1),
  };

  const particleCount = isMobile ? 80 : isTablet ? 120 : 200;
  const embeddingCount = isMobile ? 100 : isTablet ? 200 : 300;

  return (
    <div className="hero__scene">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#FF6A00" />
          <pointLight position={[-5, -5, 3]} intensity={0.3} color="#3B82F6" />

          {/* 3D Elements */}
          <NeuralNetwork mouse={normalizedMouse} />
          <EmbeddingCloud count={embeddingCount} />
          <Particles count={particleCount} />
          <TechOrbit />

          {/* Post-processing */}
          {!isMobile && (
            <EffectComposer>
              <Bloom
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                intensity={1.5}
                radius={0.8}
              />
              <Vignette eskil={false} offset={0.1} darkness={0.8} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
