"use client";

import { Zap } from "lucide-react";
import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base-100/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        
        {/* Logo Container avec effets de rayonnement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-10"
        >
          {/* Cercles d'ondes en arrière-plan */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-primary/20"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ 
                scale: [1, 1.8], 
                opacity: [0.5, 0] 
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Cœur du logo */}
          <div className="relative w-20 h-20 rounded-2xl  flex items-center justify-center shadow-[0_0_40px_rgba(var(--p),0.3)]">
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Zap size={32} className="text-primary" fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>

        {/* Texte avec animation de lettres ou de fondu */}
        <div className="space-y-3 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-3xl font-black tracking-tighter text-base-content"
          >
            Event<span className="text-primary"> Place</span>
          </motion.h2>
          
          {/* Barre de progression indéterminée "soft" */}
          <div className="relative w-40 h-1 bg-base-content/5 rounded-full overflow-hidden mx-auto">
            <motion.div 
              className="absolute inset-y-0 w-1/3 bg-primary rounded-full"
              animate={{ 
                left: ['-30%', '110%'],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10px] uppercase tracking-[0.3em] text-base-content/40 font-bold"
          >
            Préparation de votre expérience
          </motion.p>
        </div>
      </div>

      {/* Décoration subtile en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg aspect-square bg-primary/5 blur-[120px] rounded-full -z-10" />
    </div>
  );
}