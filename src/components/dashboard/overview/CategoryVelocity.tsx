// "use client";

// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";
// import { motion } from "framer-motion";
// import { BarChart2 } from "lucide-react";

// /**
//  * Data mapped from the figma reference
//  */
// const categoryData = [
//   { name: "Electronics", value: 6, color: "rgba(255, 171, 64, 1)" }, // Orange
//   { name: "Beauty", value: 2.5, color: "rgba(255, 82, 82, 1)" }, // Red
//   { name: "Sports", value: 4, color: "rgba(38, 155, 249, 1)" }, // Blue
//   { name: "Health", value: 5.5, color: "rgba(223, 17, 238, 1)" }, // Pink
//   { name: "Home", value: 1, color: "rgba(0, 234, 255, 1)" }, // Cyan
//   { name: "Fashion", value: 9, color: "rgba(255, 0, 0, 1)" }, // Intense Red
// ];

// export function CategoryVelocity() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.98 }}
//       whileInView={{ opacity: 1, scale: 1 }}
//       className="bg-[#020606] p-6 md:p-8 rounded-[32px] border border-white/5 shadow-2xl w-full"
//     >
//       {/* Header Section */}
//       <div className="flex items-center gap-3 mb-6">
//         <div className="p-2 rounded-lg bg-cyan-500/10">
//           <BarChart2 className="w-5 h-5 text-cyan-400" />
//         </div>
//         <h3 className="text-white text-xl md:text-2xl font-bold">
//           Category Velocity
//         </h3>
//       </div>

//       <div className="w-full h-px bg-white/10 mb-8" />

//       {/* Chart Container - Responsive Height */}
//       <div className="h-75 md:h-100 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={categoryData}
//             margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
//           >
//             <defs>
//               {/* Dynamic 3D Glow Filters for each bar color */}
//               {categoryData.map((item, index) => (
//                 <filter
//                   key={`glow-${index}`}
//                   id={`glow-${index}`}
//                   x="-100%"
//                   y="-100%"
//                   width="300%"
//                   height="300%"
//                 >
//                   <feGaussianBlur stdDeviation="10" result="blur" />
//                   <feFlood
//                     floodColor={item.color}
//                     floodOpacity="0.6"
//                     result="color"
//                   />
//                   <feComposite
//                     in="color"
//                     in2="blur"
//                     operator="in"
//                     result="glow"
//                   />
//                   <feMerge>
//                     <feMergeNode in="glow" />
//                     <feMergeNode in="glow" />
//                     <feMergeNode in="SourceGraphic" />
//                   </feMerge>
//                 </filter>
//               ))}
//             </defs>

//             {/* Subtle Grid Lines */}
//             <CartesianGrid
//               strokeDasharray="0"
//               vertical={false}
//               horizontal={false}
//               stroke="rgba(255, 255, 255, 0.05)"
//             />

//             <XAxis
//               dataKey="name"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#6b7280", fontSize: 12 }}
//               dy={15}
//             />

//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#6b7280", fontSize: 12 }}
//               ticks={[0, 2, 4, 6, 8]}
//               domain={[0, 10]}
//             />

//             <Tooltip
//               cursor={{ fill: "rgba(255, 255, 255, 0.03)" }}
//               contentStyle={{
//                 backgroundColor: "#111818",
//                 border: "1px solid rgba(255,255,255,0.1)",
//                 borderRadius: "12px",
//                 color: "#fff",
//               }}
//             />

//             <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={32}>
//               {categoryData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={entry.color}
//                   style={{ filter: `url(#glow-${index})` }} // Individual 3D Bloom
//                 />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </motion.div>
//   );
// }

// 3D VERSION

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";
import { useState } from "react";

const categoryData = [
  { name: "Electronics", value: 6, color: "rgba(255, 171, 64, 1)" },
  { name: "Beauty", value: 2.5, color: "rgba(255, 82, 82, 1)" },
  { name: "Sports", value: 4, color: "rgba(38, 155, 249, 1)" },
  { name: "Health", value: 5.5, color: "rgba(223, 17, 238, 1)" },
  { name: "Home", value: 1, color: "rgba(0, 234, 255, 1)" },
  { name: "Fashion", value: 9, color: "rgba(255, 0, 0, 1)" },
];

// 🔥 Convert RGBA → HEX (Three.js needs it)
function rgbaToHex(rgba: string) {
  const res = rgba.match(/\d+/g);
  if (!res) return "#ffffff";
  const [r, g, b] = res;
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function Bar3D({
  value,
  index,
  name,
  color,
}: {
  value: number;
  index: number;
  name: string;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);
  const hexColor = rgbaToHex(color);

  return (
    <group position={[index * 1.3 - 3.5, 0, 0]}>
      {/* BAR */}
      <mesh
        position={[0, value / 2, 0]}
        scale={hovered ? 1.08 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.6, value, 0.6]} />

        <meshStandardMaterial
          color={hexColor}
          emissive={hexColor}
          emissiveIntensity={hovered ? 1.6 : 0.6} // 🔥 neon boost
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* TOOLTIP */}
      {hovered && (
        <Html position={[0, value + 0.5, 0]} center>
          <div className="bg-[#111818] text-white text-xs px-3 py-1 rounded-lg border border-white/10">
            {name} {value}
          </div>
        </Html>
      )}

      {/* X LABEL */}
      <Html position={[0, -0.3, 0]} center>
        <span className="text-gray-500 text-xs whitespace-nowrap">{name}</span>
      </Html>
    </group>
  );
}

export function CategoryVelocity() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="bg-[#020606] p-6 md:p-8 rounded-[32px] border border-white/5 shadow-2xl w-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-cyan-500/10">
          <BarChart2 className="w-5 h-5 text-cyan-400" />
        </div>
        <h3 className="text-white text-xl md:text-2xl font-bold">
          Category Velocity
        </h3>
      </div>

      <div className="w-full h-px bg-white/10 mb-8" />

      {/* 3D Chart */}
      <div className="h-75 md:h-100 w-full flex items-end relative">
        <Canvas
          camera={{ position: [0, 6, 9], fov: 45 }}
          style={{ background: "transparent" }}
        >
          {/* LIGHT */}
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 10, 5]} intensity={2} />

          {/* 🔥 BASELINE ALIGN FIX */}
          <group position={[0, -4, 0]}>
            {categoryData.map((item, i) => (
              <Bar3D
                key={i}
                value={item.value}
                index={i}
                name={item.name}
                color={item.color}
              />
            ))}
          </group>

          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>

        {/* Y AXIS */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-6">
          {[10, 8, 6, 4, 2, 0].map((tick) => (
            <span key={tick} className="text-gray-500 text-xs">
              {tick}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
