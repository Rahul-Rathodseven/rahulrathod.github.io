import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NeuralNetwork({ mouse }) {
  const groupRef = useRef();
  const nodesRef = useRef();
  const connectionsRef = useRef();
  const pulsesRef = useRef();

  // Generate neural network topology — transformer-inspired layered architecture
  const { nodePositions, nodeColors, connections, pulseData } = useMemo(() => {
    const positions = [];
    const colors = [];
    const conns = [];
    const numLayers = 6;
    const nodesPerLayer = [8, 12, 14, 14, 12, 8];
    
    // Create nodes in layered arrangement
    for (let layer = 0; layer < numLayers; layer++) {
      const count = nodesPerLayer[layer];
      const layerZ = (layer - numLayers / 2) * 1.2;
      
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const radius = 1.2 + Math.sin(layer * 0.8) * 0.4;
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.3;
        const y = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.3;
        const z = layerZ + (Math.random() - 0.5) * 0.4;
        
        positions.push(x, y, z);
        
        // Color: orange core fading to dim at edges
        const intensity = 0.4 + Math.random() * 0.6;
        colors.push(1.0 * intensity, 0.42 * intensity, 0.0);
      }
    }

    // Create connections between adjacent layers
    let nodeIndex = 0;
    for (let layer = 0; layer < numLayers - 1; layer++) {
      const currentCount = nodesPerLayer[layer];
      const nextCount = nodesPerLayer[layer + 1];
      const currentStart = nodeIndex;
      const nextStart = currentStart + currentCount;
      
      for (let i = 0; i < currentCount; i++) {
        // Connect to 2-4 random nodes in next layer
        const numConnections = 2 + Math.floor(Math.random() * 3);
        for (let c = 0; c < numConnections; c++) {
          const targetIdx = nextStart + Math.floor(Math.random() * nextCount);
          conns.push({
            from: currentStart + i,
            to: targetIdx,
            weight: 0.3 + Math.random() * 0.7,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
      nodeIndex += currentCount;
    }

    // Pulse particles that travel along connections
    const numPulses = 30;
    const pulses = [];
    for (let i = 0; i < numPulses; i++) {
      const connIdx = Math.floor(Math.random() * conns.length);
      pulses.push({
        connectionIndex: connIdx,
        speed: 0.3 + Math.random() * 0.5,
        progress: Math.random(),
        size: 0.03 + Math.random() * 0.03,
      });
    }

    return {
      nodePositions: new Float32Array(positions),
      nodeColors: new Float32Array(colors),
      connections: conns,
      pulseData: pulses,
    };
  }, []);

  // Connection line geometry
  const connectionGeometry = useMemo(() => {
    const positions = [];
    const opacities = [];
    
    for (const conn of connections) {
      const fi = conn.from * 3;
      const ti = conn.to * 3;
      positions.push(
        nodePositions[fi], nodePositions[fi + 1], nodePositions[fi + 2],
        nodePositions[ti], nodePositions[ti + 1], nodePositions[ti + 2]
      );
      opacities.push(conn.weight, conn.weight);
    }

    return {
      positions: new Float32Array(positions),
      opacities: new Float32Array(opacities),
    };
  }, [nodePositions, connections]);

  // Pulse geometry
  const pulsePositions = useMemo(() => new Float32Array(pulseData.length * 3), [pulseData]);
  const pulseSizes = useMemo(() => {
    const sizes = new Float32Array(pulseData.length);
    pulseData.forEach((p, i) => { sizes[i] = p.size; });
    return sizes;
  }, [pulseData]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Rotate whole group gently toward mouse
    if (groupRef.current) {
      const targetX = (mouse.y - 0.5) * 0.3;
      const targetY = (mouse.x - 0.5) * 0.5;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.05;
    }

    // Animate node colors (pulsing)
    if (nodesRef.current) {
      const colorsAttr = nodesRef.current.geometry.attributes.color;
      for (let i = 0; i < colorsAttr.count; i++) {
        const pulse = 0.6 + Math.sin(t * 1.5 + i * 0.3) * 0.4;
        colorsAttr.setXYZ(
          i,
          nodeColors[i * 3] * pulse,
          nodeColors[i * 3 + 1] * pulse,
          nodeColors[i * 3 + 2] * pulse
        );
      }
      colorsAttr.needsUpdate = true;
    }

    // Animate connection opacities (attention simulation)
    if (connectionsRef.current) {
      const opacityAttr = connectionsRef.current.geometry.attributes.opacity;
      for (let i = 0; i < connections.length; i++) {
        const conn = connections[i];
        const attentionPulse = 0.1 + conn.weight * 0.3 * (0.5 + Math.sin(t * 2 + conn.phase) * 0.5);
        // Random attention spikes
        const spike = Math.sin(t * 5 + conn.phase * 3) > 0.95 ? 0.5 : 0;
        const finalOpacity = Math.min(attentionPulse + spike, 1.0);
        opacityAttr.setX(i * 2, finalOpacity);
        opacityAttr.setX(i * 2 + 1, finalOpacity);
      }
      opacityAttr.needsUpdate = true;
    }

    // Animate pulses along connections
    if (pulsesRef.current) {
      const posAttr = pulsesRef.current.geometry.attributes.position;
      for (let i = 0; i < pulseData.length; i++) {
        const pulse = pulseData[i];
        pulse.progress += pulse.speed * 0.005;
        if (pulse.progress > 1) {
          pulse.progress = 0;
          pulse.connectionIndex = Math.floor(Math.random() * connections.length);
        }

        const conn = connections[pulse.connectionIndex];
        const fi = conn.from * 3;
        const ti = conn.to * 3;
        const p = pulse.progress;
        
        posAttr.setXYZ(
          i,
          nodePositions[fi] + (nodePositions[ti] - nodePositions[fi]) * p,
          nodePositions[fi + 1] + (nodePositions[ti + 1] - nodePositions[fi + 1]) * p,
          nodePositions[fi + 2] + (nodePositions[ti + 2] - nodePositions[fi + 2]) * p
        );
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neural Network Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={nodePositions}
            count={nodePositions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={nodeColors}
            count={nodeColors.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Attention Connections */}
      <lineSegments ref={connectionsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={connectionGeometry.positions}
            count={connectionGeometry.positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-opacity"
            array={connectionGeometry.opacities}
            count={connectionGeometry.opacities.length}
            itemSize={1}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#FF6A00"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Data Pulses (token streams) */}
      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={pulsePositions}
            count={pulseData.length}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            array={pulseSizes}
            count={pulseData.length}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#FF8A00"
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
