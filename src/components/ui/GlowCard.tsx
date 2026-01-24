import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export function GlowCard({ 
  children, 
  className = '', 
  glowColor = 'from-purple-500 to-pink-500',
  onClick 
}: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`relative group cursor-pointer ${className}`}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${glowColor} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
      
      {/* Card Content */}
      <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
        {children}
      </div>
    </motion.div>
  );
}

export default GlowCard;
