import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSubmit?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * AI 对话输入组件（预留接口）
 * onSubmit 接口用于后续接入千问 API
 */
export function ChatInput({
  onSubmit,
  placeholder = 'Describe what you want to build...',
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSubmit) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center gap-3 p-2 rounded-2xl bg-zinc-900 border border-zinc-800 focus-within:border-purple-500/50 transition-colors">
        {/* AI Icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>

        {/* Input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent text-white placeholder-zinc-500 focus:outline-none disabled:opacity-50"
        />

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={disabled || !message.trim()}
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Hint Text */}
      <p className="mt-2 text-xs text-zinc-500 text-center">
        Press Enter to send • Powered by AI
      </p>
    </form>
  );
}

export default ChatInput;
