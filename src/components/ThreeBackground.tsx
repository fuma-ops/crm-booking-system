import React, { useMemo } from 'react';
import { motion } from 'motion/react';

export const FloatingCrosses: React.FC = () => {
  const elements = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      type: Math.random() > 0.6 ? 'circle' : 'cross',
      size: Math.random() > 0.5 ? 20 + Math.random() * 20 : 50 + Math.random() * 40,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * -30,
      opacity: 0.08 + Math.random() * 0.12,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #f0f4f8, #e2e8f0)' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#148f77]/5 via-transparent to-transparent pointer-events-none" />
      
      {elements.map((c) => (
        <motion.div
           key={c.id}
           className="absolute flex items-center justify-center font-black"
           style={{ 
             left: c.left, 
             top: c.top, 
             fontSize: c.type === 'cross' ? c.size : undefined,
             width: c.type === 'circle' ? c.size : undefined,
             height: c.type === 'circle' ? c.size : undefined,
             borderRadius: c.type === 'circle' ? '50%' : undefined,
             border: c.type === 'circle' ? `3px solid #148f77` : undefined,
             color: '#148f77',
             opacity: c.opacity
           }}
           animate={{
             y: [0, -200, 0],
             x: [0, 80, 0],
             rotate: c.type === 'cross' ? [0, 90, 180, 360] : 0,
             scale: [1, 1.2, 1]
           }}
           transition={{
             duration: c.duration,
             repeat: Infinity,
             ease: "linear",
             delay: c.delay
           }}
        >
          {c.type === 'cross' ? '+' : ''}
        </motion.div>
      ))}
    </div>
  );
};
