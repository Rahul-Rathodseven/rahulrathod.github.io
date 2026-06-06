import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles({ count = 200 }) {
  const pointsRef = useRef();

  const { positions, particleData } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const data = [];

    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      data.push({
        baseX: pos[i * 3],
        baseY: pos[i * 3 + 1],
        baseZ: pos[i * 3 + 2],
        speed: 0.1 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
        amplitude: 0.1 + Math.random() * 0.3,
      });
    }

    return { positions: pos, particleData: data };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const d = particleData[i];
      posAttr.setXYZ(
        i,
        d.baseX + Math.sin(t * d.speed + d.phase) * d.amplitude,
        d.baseY + Math.cos(t * d.speed * 0.8 + d.phase) * d.amplitude,
        d.baseZ + Math.sin(t * d.speed * 0.6 + d.phase * 1.5) * d.amplitude
      );
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
