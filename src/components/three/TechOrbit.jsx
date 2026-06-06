import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';

const techItems = [
  { name: 'Python', color: '#3776AB' },
  { name: 'PyTorch', color: '#EE4C2C' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'GitHub', color: '#ffffff' },
  { name: 'React', color: '#61DAFB' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'TensorFlow', color: '#FF6F00' },
  { name: 'K8s', color: '#326CE5' },
];

function OrbitingTech({ name, color, orbitRadius, speed, inclination, phase, yOffset }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * orbitRadius;
      ref.current.position.z = Math.sin(t) * orbitRadius * Math.cos(inclination);
      ref.current.position.y = Math.sin(t) * orbitRadius * Math.sin(inclination) + yOffset + Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        {/* Glow halo */}
        <mesh>
          <planeGeometry args={[0.6, 0.6]} />
          <meshBasicMaterial color={color} transparent opacity={0.05} />
        </mesh>
        {/* Text label */}
        <Text
          fontSize={0.15}
          color={color}
          anchorX="center"
          anchorY="middle"
          font={undefined}
          outlineWidth={0}
          fillOpacity={0.7}
        >
          {name}
        </Text>
      </Billboard>
    </group>
  );
}

export default function TechOrbit() {
  const orbits = useMemo(() => {
    return techItems.map((tech, i) => ({
      ...tech,
      orbitRadius: 3.5 + (i % 3) * 0.8,
      speed: 0.15 + (i * 0.03),
      inclination: (i * 0.4) - 0.8,
      phase: (i / techItems.length) * Math.PI * 2,
      yOffset: (Math.random() - 0.5) * 0.5,
    }));
  }, []);

  return (
    <group>
      {orbits.map((orbit, i) => (
        <OrbitingTech key={i} {...orbit} />
      ))}
    </group>
  );
}
