// "use client";

// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Html } from "@react-three/drei";
// import { useState } from "react";

// const ratingData = [
//   { name: "Headphone", rating: 5 },
//   { name: "Charger", rating: 4 },
//   { name: "Bottle", rating: 3.5 },
//   { name: "Book", rating: 2 },
//   { name: "Mac Mini", rating: 3 },
//   { name: "Cable", rating: 1.2 },
// ];

// function Bar3D({
//   value,
//   index,
//   name,
// }: {
//   value: number;
//   index: number;
//   name: string;
// }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <group position={[index * 1.2 - 3, 0, 0]}>
//       {/* BAR */}
//       <mesh
//         position={[0, value / 2, 0]}
//         scale={hovered ? 1.1 : 1}
//         onPointerOver={() => setHovered(true)}
//         onPointerOut={() => setHovered(false)}
//       >
//         <boxGeometry args={[0.7, value, 0.7]} />

//         <meshStandardMaterial
//           color="#00FFC3"
//           emissive="#00FFC3"
//           emissiveIntensity={hovered ? 1.5 : 0.7} // 🔥 neon boost
//           roughness={0.3}
//           metalness={0.2}
//         />
//       </mesh>

//       {/* TOOLTIP */}
//       {hovered && (
//         <Html position={[0, value + 0.5, 0]} center>
//           <div className="bg-[#1C292A] text-white text-xs px-3 py-1 rounded-lg border border-cyan-400">
//             {name} - {value} ⭐
//           </div>
//         </Html>
//       )}

//       {/* X AXIS LABEL */}
//       <Html position={[0, -0.5, 0]} center>
//         <span className="text-gray-400 text-xs">{name}</span>
//       </Html>
//     </group>
//   );
// }

// // ✅ FIX: base ground so bars start from 0 visually
// function Ground() {
//   return (
//     <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
//       <planeGeometry args={[20, 10]} />
//       <meshBasicMaterial transparent opacity={0} />
//     </mesh>
//   );
// }

// export function Bar3DChart() {
//   return (
//     <div className="h-110 w-full relative">
//       <Canvas
//         camera={{ position: [0, 6, 8], fov: 45 }}
//         style={{ background: "transparent" }}
//       >
//         {/* LIGHT */}
//         <ambientLight intensity={0.3} />
//         <pointLight position={[5, 8, 5]} intensity={2} />

//         {/* GROUND FIX */}
//         <Ground />

//         {/* BARS */}
//         {ratingData.map((item, i) => (
//           <Bar3D key={i} value={item.rating} index={i} name={item.name} />
//         ))}

//         {/* CAMERA */}
//         <OrbitControls
//           enableZoom={false}
//           maxPolarAngle={Math.PI / 2.2}
//           minPolarAngle={Math.PI / 3}
//         />
//       </Canvas>

//       {/* Y AXIS STARS */}
//       <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-10">
//         {[5, 4, 3, 2, 1].map((star) => (
//           <div key={star} className="flex gap-1">
//             {Array.from({ length: star }).map((_, i) => (
//               <span key={i} className="text-[#00FFC3] text-xs">
//                 ★
//               </span>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useState } from "react";

const ratingData = [
  { name: "Headphone", rating: 5 },
  { name: "Charger", rating: 4 },
  { name: "Bottle", rating: 3.5 },
  { name: "Book", rating: 2 },
  { name: "Mac Mini", rating: 3 },
  { name: "Cable", rating: 1.2 },
];

function Bar3D({
  value,
  index,
  name,
}: {
  value: number;
  index: number;
  name: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={[index * 1.2 - 3, 0, 0]}>
      {/* BAR */}
      <mesh
        position={[0, value / 2, 0]}
        scale={hovered ? 1.1 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.7, value, 0.7]} />

        <meshStandardMaterial
          color="#00FFC3"
          emissive="#00FFC3"
          emissiveIntensity={hovered ? 1.5 : 0.7}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* TOOLTIP */}
      {hovered && (
        <Html position={[0, value + 0.4, 0]} center>
          <div className="bg-[#1C292A] text-white text-xs px-3 py-1 rounded-lg border border-cyan-400 shadow-lg">
            {name} - {value} ⭐
          </div>
        </Html>
      )}

      {/* X AXIS LABEL */}
      <Html position={[0, -0.5, 0]} center>
        <span className="text-gray-400 text-xs whitespace-nowrap">{name}</span>
      </Html>
    </group>
  );
}

export function Bar3DChart() {
  return (
    <div className="h-110 w-full relative flex items-end">
      <Canvas
        camera={{ position: [0, 4.5, 7], fov: 45 }}
        style={{ background: "transparent" }}
      >
        {/* LIGHT */}
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 8, 5]} intensity={2} />

        {/* 🔥 SHIFT ENTIRE CHART DOWN (FIX BASELINE) */}
        <group position={[0, -2.5, 0]}>
          {ratingData.map((item, i) => (
            <Bar3D key={i} value={item.rating} index={i} name={item.name} />
          ))}
        </group>

        {/* CAMERA CONTROL */}
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      {/* Y AXIS STARS */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-10">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex gap-1">
            {Array.from({ length: star }).map((_, i) => (
              <span key={i} className="text-[#00FFC3] text-xs">
                ★
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
