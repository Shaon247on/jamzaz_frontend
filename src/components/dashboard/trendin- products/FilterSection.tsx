// "use client";
// import { motion } from "framer-motion";
// import { Lock, Filter } from "lucide-react"; // npm i lucide-react

// const categories = [
//   "All categories",
//   "Electronics",
//   "Fashion & Beauty",
//   "Clothing",
//   "Home & Garden",
// ];

// const FilterSection = () => {
//   return (
//     <div className="space-y-8 p-6 bg-[#0a0c10] text-white">
//       <div>
//         <div className="flex items-center gap-2 mb-4">
//           <Filter className="text-cyan-400 w-5 h-5" />
//           <h3 className="text-lg font-medium">Filter by category</h3>
//           <span className="bg-purple-900/30 text-purple-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
//             <Lock size={12} /> Locked
//           </span>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           {categories.map((cat, i) => (
//             <button
//               key={cat}
//               className={`px-4 py-2 rounded-lg border transition-all ${
//                 i === 0
//                   ? "bg-cyan-400 border-cyan-400 text-black font-bold"
//                   : "border-gray-700 bg-gray-800/50 text-gray-400 opacity-60 cursor-not-allowed"
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 {i !== 0 && <Lock size={14} />}
//                 {cat}
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Upgrade Banner */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-purple-900/10 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden"
//       >
//         <div className="relative z-10">
//           <div className="flex items-center gap-2 text-purple-400 mb-2">
//             <Lock size={18} />
//             <h4 className="font-bold">Unlock Category Filter</h4>
//           </div>
//           <p className="text-gray-400 text-sm max-w-md mb-4">
//             Upgrade to category ad-on ($5/month) to filter products by specific
//             categories and get deeper insights.
//           </p>
//           <button className="bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-2 rounded-lg font-bold text-white hover:brightness-110 transition">
//             Upgrade Now
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default FilterSection;

"use client";
import { motion } from "framer-motion";
import { Lock, Filter } from "lucide-react";

const categories = [
  "All categories",
  "Electronics",
  "Fashion & Beauty",
  "Clothing",
  "Home & Garden",
];

const marketplaces = ["All", "Amazon", "eBay", "Walmart"];

// This defines the gradient "paint" that the icons will use
const GradientFilterIcon = () => (
  <svg width="0" height="0" style={{ position: "absolute" }}>
    <defs>
      <linearGradient
        id="blue-purple-gradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        <stop stopColor="#00eaff" offset="0%" />
        <stop stopColor="#269bf9" offset="25%" />
        <stop stopColor="#5b5df9" offset="50%" />
        <stop stopColor="#af28f9" offset="75%" />
        <stop stopColor="#df11ee" offset="100%" />
      </linearGradient>
    </defs>
  </svg>
);

const FilterSection = () => {
  return (
    <div className="space-y-10 p-8 bg-[#0a0c10] min-h-screen text-white font-sans">
      {/* CRITICAL: You must render the definition here so the stroke can find the ID */}
      <GradientFilterIcon />

      {/* 1. Category Filter Section */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <Filter size={20} stroke="url(#blue-purple-gradient)" />
          <h3 className="text-lg font-medium">Filter by category</h3>
          <span className="bg-[#2d1b4d] text-purple-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center gap-1 border border-purple-500/30">
            <Lock size={10} /> Locked
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((cat, i) => (
            <button
              key={cat}
              disabled={i !== 0}
              className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 text-sm ${
                i === 0
                  ? "bg-cyan-400 border-cyan-400 text-black font-bold"
                  : "border-gray-700 bg-gray-800/40 text-gray-500 opacity-60 cursor-not-allowed"
              }`}
            >
              {i !== 0 && <Lock size={14} />}
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Marketplace Filter Section */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <Filter size={20} stroke="url(#blue-purple-gradient)" />
          <h3 className="text-lg font-medium">Filter by Marketplace</h3>
          <span className="bg-[#2d1b4d] text-purple-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center gap-1 border border-purple-500/30">
            <Lock size={10} /> Locked
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {marketplaces.map((market, i) => (
            <button
              key={market}
              disabled={i !== 0}
              className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 text-sm ${
                i === 0
                  ? "bg-cyan-400 border-cyan-400 text-black font-bold"
                  : "border-gray-700 bg-gray-800/40 text-gray-500 opacity-60 cursor-not-allowed"
              }`}
            >
              {i !== 0 && <Lock size={14} />}
              {market}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Upgrade Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#1a132d] border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden mt-4"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-magenta-400 mb-3">
            <Lock size={20} className="text-purple-500" />
            <h4 className="font-bold text-xl text-purple-400">
              Unlock Category Filter
            </h4>
          </div>
          <p className="text-gray-400 text-sm max-w-lg mb-6 leading-relaxed">
            Upgrade to category ad-on ($5/month) to filter products by specific
            categories and get deeper insights into each market segment.
          </p>
          <button className="bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-3 rounded-xl font-bold text-white hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20">
            Upgrade Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FilterSection;
