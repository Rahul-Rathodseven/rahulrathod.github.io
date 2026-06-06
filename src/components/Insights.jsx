import { motion } from 'framer-motion';
import { TbPencil } from 'react-icons/tb';

export default function Insights() {
  return (
    <section className="section" id="insights">
      <div className="section__container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Writing</span>
          <h2 className="section__title">Insights</h2>
        </motion.div>

        <motion.div
          className="insights__coming-soon glass-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="insights__icon">
            <TbPencil />
          </div>
          <h3 className="insights__title">Coming Soon</h3>
          <p className="insights__description">
            Thoughts on AI, Machine Learning, software engineering, and the
            journey of building intelligent systems.
          </p>
          <div className="insights__subscribe">
            <input
              type="email"
              className="insights__input"
              placeholder="your@email.com"
              aria-label="Email for updates"
            />
            <button className="btn-primary">
              <span>Stay Updated</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
