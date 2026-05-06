'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function FloatingGeometry() {
  const ref = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for parallax effect
  useState(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });

  useFrame(() => {
    if (ref.current) {
      // Smooth rotation
      ref.current.rotation.x += 0.0003;
      ref.current.rotation.y += 0.0005;

      // Parallax effect following mouse
      ref.current.position.x += (mousePosition.x * 0.5 - ref.current.position.x) * 0.05;
      ref.current.position.y += (mousePosition.y * 0.5 - ref.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {/* Icosahedron */}
      <mesh position={[-2, 1, 0]}>
        <icosahedronGeometry args={[1, 4]} />
        <meshPhongMaterial
          color="#4F7EE9"
          wireframe={false}
          emissive="#2d5bb8"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Octahedron */}
      <mesh position={[2.5, -0.5, 0]}>
        <octahedronGeometry args={[1.2, 2]} />
        <meshPhongMaterial
          color="#1E5DD9"
          wireframe={false}
          emissive="#0f3fa8"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Torus */}
      <mesh position={[0, -1.5, -1]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.4, 16, 32]} />
        <meshPhongMaterial
          color="#4F7EE9"
          wireframe={false}
          emissive="#2d5bb8"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Dodecahedron */}
      <mesh position={[-1.5, -1, 1]}>
        <dodecahedronGeometry args={[0.8]} />
        <meshPhongMaterial
          color="#0046C0"
          wireframe={false}
          emissive="#003090"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Tetrahedron */}
      <mesh position={[1, 1.5, 0.5]}>
        <tetrahedronGeometry args={[0.9]} />
        <meshPhongMaterial
          color="#6B9EFF"
          wireframe={false}
          emissive="#4f7ee9"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FFFFFF" />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#4F7EE9" />
      <pointLight position={[0, 0, -10]} intensity={0.3} color="#1E5DD9" />
    </>
  );
}

export function ThreeDBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <Lights />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
