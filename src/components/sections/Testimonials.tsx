import { motion } from 'framer-motion';

const testimonials = [
  {
    id: '1',
    name: 'Anusha K',
    content: 'I have to say nothing is like Atoms, I have tried all other agents, but nothing comes close tbh. just add the database part and publishing to Play Store, App Store option...',
    highlightWord: 'Atoms',
  },
  {
    id: '2',
    name: 'Mike Judkins',
    content: "Hi Atoms team, thanks for building such an awesome tool! Y'all are doing an amazing job. Keep up the great work!",
    highlightWord: 'Atoms',
  },
  {
    id: '3',
    name: 'Michel Harvey',
    content: 'I love my Atoms experience. I learned a lot during my first month! Functional website + a web3.0 gaming ecosystem built on my mobile with Atoms.',
    highlightWord: 'Atoms',
  },
  {
    id: '4',
    name: 'kkangaces210103101',
    content: "Honestly, go peep Atoms. You just yak what you want, and it cranks out a full web or mobile app front and back end, ready to roll.",
    highlightWord: 'Atoms',
  },
  {
    id: '5',
    name: 'Hasan',
    content: "Finally! An AI that understands research isn't just about finding links, it's about extracting REAL insights. The tab struggle is so real - this could be a total workflow transformation.",
    highlightWord: null,
  },
  {
    id: '6',
    name: 'Kausik Lal',
    content: 'Atoms is a game-changer in AI-assisted software development. For anyone looking to streamline their software development process, Atoms is a must-try.',
    highlightWord: 'Atoms',
  },
  {
    id: '7',
    name: 'Mia',
    content: 'Built a TikTok pet filter game during my coffee break. The AI engineer roasted my JS code & rewrote it. Savage but effective. 10/10 would get owned by robots again.',
    highlightWord: null,
  },
  {
    id: '8',
    name: 'Beau Carnes',
    content: "The Atoms AI web app builder is fascinating. Instead of one AI agent, it has different AI agent specialists that work together. There's Bob the Systems Architect, David the Data Analyst, and more.",
    highlightWord: 'Atoms',
  },
  {
    id: '9',
    name: 'stellar',
    content: 'Atoms is really great for building projects and troubleshooting and fixing code errors. I\'m saying this after testing and having 3 other premium ai subscriptions.',
    highlightWord: 'Atoms',
  },
  {
    id: '10',
    name: 'Consistent_Design72',
    content: 'You kick off with an idea, it slices itself into tasks, and a bunch of agents team up on planning, coding, and delivery without you duct taping six different tools.',
    highlightWord: 'Atoms',
  },
  {
    id: '11',
    name: 'VeeroTech Web Hosting',
    content: 'Create full-stack applications with just prompts and have AI agents create it for you.',
    highlightWord: null,
  },
  {
    id: '12',
    name: 'Rabinder Hooda',
    content: "An AI team members that covers PM, dev, and analytics feels like a dream for rapid prototyping. UI's clean, flow is smooth. I could see myself actually using this to spin up ideas fast.",
    highlightWord: 'Atoms',
  },
  {
    id: '13',
    name: 'badamtszz',
    content: "For something beginner-friendly but still beefy, grab Atoms. It's a full multi-agent workspace where you can play with deep-research agents, code gen, and plain-English orchestration.",
    highlightWord: 'Atoms',
  },
  {
    id: '14',
    name: 'ArwalHassan',
    content: "Atoms gets me closer to a real full-stack app, not just a prototype. It's more like an AI co-dev that actually plans the backend, routes, and even reusable APIs from a description.",
    highlightWord: 'Atoms',
  },
];

// Split testimonials into two rows
const row1 = testimonials.slice(0, 7);
const row2 = testimonials.slice(7, 14);

// Duplicate for infinite scroll
const row1Duplicated = [...row1, ...row1];
const row2Duplicated = [...row2, ...row2];

function highlightText(content: string, word: string | null) {
  if (!word) return content;
  
  const parts = content.split(new RegExp(`(${word})`, 'gi'));
  return parts.map((part, index) => 
    part.toLowerCase() === word.toLowerCase() ? (
      <span key={index} className="text-gradient font-semibold">{part}</span>
    ) : (
      part
    )
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex-shrink-0 w-80 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all"
    >
      <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
        {highlightText(testimonial.content, testimonial.highlightWord)}
      </p>
      <p className="text-xs text-zinc-500">{testimonial.name}</p>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            深受全球用户喜爱
          </h2>
        </motion.div>
      </div>

      {/* Scrolling Testimonials */}
      <div className="space-y-6 relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Scroll Left */}
        <div className="flex gap-4 animate-scroll-left hover:[animation-play-state:paused]">
          {row1Duplicated.map((testimonial, index) => (
            <TestimonialCard key={`row1-${testimonial.id}-${index}`} testimonial={testimonial} />
          ))}
        </div>

        {/* Row 2 - Scroll Right */}
        <div className="flex gap-4 animate-scroll-right hover:[animation-play-state:paused]">
          {row2Duplicated.map((testimonial, index) => (
            <TestimonialCard key={`row2-${testimonial.id}-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
