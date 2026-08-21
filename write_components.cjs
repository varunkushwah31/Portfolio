const fs = require('fs');

const hero = import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

interface HeroProps {
  onOpenResume?: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function Hero({ onOpenResume: _onOpenResume }: HeroProps) {
  return (
    <section className="pt-20 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-body text-lg mb-3"
        >
          {"Hi, I'm"}
        </motion.p>
        <motion.h1
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-ink leading-tight mb-4"
        >
          <span className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
            Varun Kushwah
          </span>
        </motion.h1>
        <motion.p
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-xl md:text-2xl text-body-strong font-normal mb-5"
        >
          Computer Science Student & Software Developer
        </motion.p>
        <motion.p
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-base text-body leading-relaxed max-w-xl mb-9"
        >
          I build robust backend systems with Java & Spring Boot, and explore
          real-time protocols. Java Coordinator at devup.
        </motion.p>
        <motion.div
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 border border-hairline hover:border-accent text-ink rounded-full px-5 py-2 text-sm transition-colors duration-200"
          >
            Discover more
            <ArrowRight size={14} weight="bold" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
;

fs.writeFileSync('d:/Portfolio/src/components/Hero.tsx', hero, 'utf8');
console.log('Hero.tsx written');

const techStack = import { motion } from 'framer-motion';

interface Tech {
  name: string;
  color: string;
}

const techs: Tech[] = [
  { name: 'Java',        color: 'bg-orange-500' },
  { name: 'Spring Boot', color: 'bg-green-500'  },
  { name: 'React',       color: 'bg-blue-500'   },
  { name: 'Flutter',     color: 'bg-cyan-400'   },
  { name: 'Python',      color: 'bg-yellow-400' },
  { name: 'WebRTC',      color: 'bg-violet-500' },
  { name: 'Docker',      color: 'bg-blue-400'   },
  { name: 'Git',         color: 'bg-red-500'    },
  { name: 'TypeScript',  color: 'bg-blue-600'   },
  { name: 'Node.js',     color: 'bg-green-400'  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TechStack() {
  return (
    <section className="pt-6 pb-4 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-muted text-sm font-medium mb-4"
        >
          Tech stack
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-2"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {techs.map((tech) => (
            <motion.span
              key={tech.name}
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-card px-3 py-1.5 text-sm text-body-strong"
            >
              <span className={"w-2 h-2 rounded-full inline-block flex-shrink-0 " + tech.color} />
              {tech.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
;

fs.writeFileSync('d:/Portfolio/src/components/TechStack.tsx', techStack, 'utf8');
console.log('TechStack.tsx written');
