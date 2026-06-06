import { motion } from 'framer-motion';
import { TbBrain, TbRocket, TbCode, TbTarget } from 'react-icons/tb';

const highlights = [
  {
    icon: TbBrain,
    title: 'AI-First Mindset',
    description:
      'Approaching every problem with an intelligent systems perspective — from data pipelines to model deployment.',
  },
  {
    icon: TbCode,
    title: 'Full Stack Capable',
    description:
      'Building end-to-end applications with Python, FastAPI, and modern web technologies.',
  },
  {
    icon: TbRocket,
    title: 'Production Focus',
    description:
      'Not just building models — learning MLOps, Docker, and Kubernetes to ship AI at scale.',
  },
  {
    icon: TbTarget,
    title: 'Continuous Growth',
    description:
      'Currently deep-diving into Deep Learning, PyTorch, and transformer architectures.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="section__container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">About</span>
          <h2 className="section__title">The Journey of an AI Engineer</h2>
        </motion.div>

        <div className="about__grid">
          <motion.div
            className="about__text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p>
              I&apos;m Rahul Rathod — an AI Engineer and Full Stack Developer on a mission to build 
              intelligent systems that solve real-world problems. My journey began with a deep 
              fascination for how machines can learn from data and make intelligent decisions.
            </p>
            <p>
              Starting with a rigorous 100+ day Python challenge, I built a solid engineering 
              foundation before diving into the world of Machine Learning and Deep Learning. 
              Today, I work across the full stack of AI — from data preprocessing and model 
              training to API development and deployment.
            </p>
            <p>
              My philosophy is simple: <strong style={{ color: 'var(--color-accent)' }}>
              build production-grade AI, not just notebooks</strong>. Every project I take on 
              is designed to be deployable, scalable, and impactful. I&apos;m currently deepening 
              my expertise in PyTorch, transformer architectures, and MLOps to bridge the gap 
              between research and production.
            </p>
          </motion.div>

          <motion.div
            className="about__highlights"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                className="about__highlight-card glass-card"
                variants={itemVariants}
              >
                <div className="about__highlight-icon">
                  <item.icon />
                </div>
                <div className="about__highlight-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
