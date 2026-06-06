import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function EmbeddingCloud({ count = 300 }) {
  const pointsRef = useRef();

  const { positions, colors, clusterData } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const clusters = [];

    // Define 5 clusters (like t-SNE projections)
    const clusterCenters = [
      { x: 3, y: 1.5, z: 0, color: [1.0, 0.42, 0.0] },    // Orange
      { x: -2.5, y: 2, z: 1, color: [0.23, 0.51, 0.96] },   // Blue
      { x: 2, y: -2, z: -1, color: [0.55, 0.36, 0.96] },     // Purple
      { x: -3, y: -1, z: 0.5, color: [0.06, 0.72, 0.51] },   // Green
      { x: 0, y: 3, z: -0.5, color: [0.94, 0.27, 0.27] },    // Red
    ];

    for (let i = 0; i < count; i++) {
      const cluster = clusterCenters[Math.floor(Math.random() * clusterCenters.length)];
      const spread = 0.8;
      
      pos[i * 3] = cluster.x + (Math.random() - 0.5) * spread * 2;
      pos[i * 3 + 1] = cluster.y + (Math.random() - 0.5) * spread * 2;
      pos[i * 3 + 2] = cluster.z + (Math.random() - 0.5) * spread * 2;

      const intensity = 0.3 + Math.random() * 0.4;
      col[i * 3] = cluster.color[0] * intensity;
      col[i * 3 + 1] = cluster.color[1] * intensity;
      col[i * 3 + 2] = cluster.color[2] * intensity;

      clusters.push({
        baseX: pos[i * 3],
        baseY: pos[i * 3 + 1],
        baseZ: pos[i * 3 + 2],
        driftSpeed: 0.2 + Math.random() * 0.3,
        driftPhase: Math.random() * Math.PI * 2,
        driftRadius: 0.05 + Math.random() * 0.1,
      });
    }

    return { positions: pos, colors: col, clusterData: clusters };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const data = clusterData[i];
      const drift = data.driftRadius;
      
      posAttr.setXYZ(
        i,
        data.baseX + Math.sin(t * data.driftSpeed + data.driftPhase) * drift,
        data.baseY + Math.cos(t * data.driftSpeed * 0.7 + data.driftPhase) * drift,
        data.baseZ + Math.sin(t * data.driftSpeed * 0.5 + data.driftPhase * 2) * drift
      );
    }
    posAttr.needsUpdate = true;

    // Gentle rotation
    pointsRef.current.rotation.y = t * 0.02;
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
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
