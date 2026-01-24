import { motion } from 'framer-motion';
import { Play, Copy, Maximize2 } from 'lucide-react';
import { useState } from 'react';

interface MiniWebPreviewProps {
  title: string;
  category: string;
  previewContent: React.ReactNode;
  onExpand: () => void;
  onClone: () => void;
}

export function MiniWebPreview({
  title,
  category,
  previewContent,
  onExpand,
  onClone,
}: MiniWebPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative w-80 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group cursor-pointer"
    >
      {/* Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 -z-10"
      />

      {/* Browser Chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800/80 border-b border-zinc-700">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 mx-2">
          <div className="h-5 bg-zinc-700/50 rounded-full px-3 flex items-center">
            <span className="text-[10px] text-zinc-500 truncate">atoms.dev/preview/{title.toLowerCase().replace(/\s+/g, '-')}</span>
          </div>
        </div>
      </div>

      {/* Preview Content - Mini Website */}
      <div className="relative h-48 overflow-hidden bg-zinc-950">
        {/* Scaled down website preview */}
        <div className="absolute inset-0 transform scale-[0.4] origin-top-left w-[250%] h-[250%]">
          {previewContent}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
      </div>

      {/* Info & Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs text-purple-400 block mb-1">Remix the Session</span>
            <h3 className="text-base font-semibold text-white">{title}</h3>
          </div>
          <span className="px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded-full">
            {category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
            预览
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              onClone();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4" />
            克隆
          </motion.button>
        </div>
      </div>

      {/* Hover Play Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default MiniWebPreview;
