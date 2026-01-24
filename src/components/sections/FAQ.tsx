import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqItems = [
  {
    id: '1',
    question: 'What is Atoms?',
    answer: 'Atoms is an AI-powered development platform that turns your idea into working products. It runs a multi-agent workflow, a team of AI employees such as Product Manager, Engineer, and Data Scientist, who work together to plan, build, test, and launch your app from scratch.',
  },
  {
    id: '2',
    question: 'What can I build with Atoms?',
    answer: 'If you can describe it, Atoms AI can build it. Popular projects include: SaaS (Subscription-based products with user login and real-time database storage), Internal Tools (Dashboard and tools to manage your business data), Personal Website (Beautiful portfolio, blog, or personal brand site), E-commerce (Product pages that convert, with Stripe for secure payments).',
  },
  {
    id: '3',
    question: 'Do I need coding or technical skills to use Atoms?',
    answer: 'No. Atoms AI is made for vibe coding, which means you build with natural language in chat. If you can explain what you want, you can build it. For advanced users, Atoms AI also includes a code editor, but you do not need technical experience to get started.',
  },
  {
    id: '4',
    question: 'How are Atoms apps or websites deployed?',
    answer: 'With one click. Atoms AI handles hosting and server configuration for you. When you are ready, publish a live URL instantly. No complex setup required.',
  },
  {
    id: '5',
    question: 'How does the Credit system work, and is the pricing transparent?',
    answer: 'Atoms uses a transparent credit system. Credits are used based on the complexity of the tasks the AI performs, such as generating features, testing and deploying. You can see your credit balance and usage in real time on your dashboard, so you stay in control of your budget.',
  },
  {
    id: '6',
    question: 'How does Atoms help me win paying customers?',
    answer: 'Atoms AI helps you go beyond a finished app and drive growth from day one. You can launch SEO pages and automate SEO improvement. With Stripe payments built in, you can start charging as soon as you publish.',
  },
  {
    id: '7',
    question: 'Do I own what I build with Atoms?',
    answer: 'Yes. You can export your code or sync your project to GitHub anytime, so you always have full control as you keep building and growing. After you export your code, you can run it locally or host it on your own infrastructure.',
  },
  {
    id: '8',
    question: 'Can Atoms integrate with the tools I already use?',
    answer: 'Yes. Atoms AI supports integration with common tools, so you can plug into your existing workflow. This helps you build something viable for real business use, not just a demo.',
  },
  {
    id: '9',
    question: 'Does Atoms support my native language?',
    answer: 'Yes. Atoms supports natural language input and can work across multiple languages. You can ideate, chat, and build in your native language for a seamless development experience.',
  },
];

function FAQItem({ item, isOpen, onToggle }: { 
  item: typeof faqItems[0]; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={false}
      className="border-b border-zinc-800"
    >
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-white' : 'text-zinc-300'}`}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-purple-400' : 'text-zinc-500'}`} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-zinc-400 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0].id);

  return (
    <section className="py-24 relative" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            常见问题
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {faqItems.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
