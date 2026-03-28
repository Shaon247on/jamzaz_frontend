"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const platformData = [
  { name: "Amazon", value: 400, color: "#915DFF" },
  { name: "Walmart", value: 300, color: "#00FF00" },
  { name: "eBay", value: 300, color: "#FFFF00" },
];

function Pie3D() {
  const total = platformData.reduce((a, b) => a + b.value, 0);
  let startAngle = 0;

  return (
    <>
      {platformData.map((item, i) => {
        const angle = (item.value / total) * Math.PI * 2;

        const shape = new THREE.Shape();
        shape.absarc(0, 0, 2, startAngle, startAngle + angle, false);
        shape.absarc(0, 0, 1.2, startAngle + angle, startAngle, true);

        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 0.4,
          bevelEnabled: false,
        });

        const mesh = (
          <mesh key={i} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.6}
            />
          </mesh>
        );

        startAngle += angle;
        return mesh;
      })}
    </>
  );
}

export function Pie3DChart() {
  return (
    <Canvas camera={{ position: [0, 4, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <Pie3D />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
