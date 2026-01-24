import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Template {
  id: string;
  title: string;
  category: string;
  prompt: string;
  previewUrl: string;
}

interface TemplatePreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onClone?: (prompt: string) => void;
}

export function TemplatePreviewModal({
  template,
  isOpen,
  onClose,
  onClone,
}: TemplatePreviewModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = async () => {
    if (!template) return;
    
    try {
      await navigator.clipboard.writeText(template.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onClone?.(template.prompt);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && template && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 flex flex-col bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-semibold text-white">{template.title}</h3>
                <p className="text-sm text-zinc-400">{template.category}</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Clone Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      克隆会话
                    </>
                  )}
                </motion.button>
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-hidden bg-zinc-950 p-4">
              <div className="w-full h-full rounded-lg overflow-hidden border border-zinc-800 bg-white">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 border-b border-zinc-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full text-sm text-zinc-500 border border-zinc-200">
                      <ExternalLink className="w-3 h-3" />
                      {template.previewUrl}
                    </div>
                  </div>
                </div>
                
                {/* Iframe Preview */}
                <iframe
                  src={template.previewUrl}
                  title={template.title}
                  className="w-full h-[calc(100%-48px)]"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>

            {/* Prompt Preview */}
            <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/50">
              <p className="text-xs text-zinc-500 mb-2">提示词预览</p>
              <p className="text-sm text-zinc-300 line-clamp-2">{template.prompt}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default TemplatePreviewModal;
