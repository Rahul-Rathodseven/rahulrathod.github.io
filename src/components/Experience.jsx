import { motion } from 'framer-motion';
import { milestones } from '../data/experience';

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="section__container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Journey</span>
          <h2 className="section__title">Experience &amp; Growth</h2>
          <p className="section__subtitle">
            A timeline of learning, building, and evolving as an AI engineer.
          </p>
        </motion.div>

        <div className="timeline">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              className="timeline__item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="timeline__dot" />
              <span className="timeline__date">{milestone.date}</span>
              <h3 className="timeline__title">{milestone.title}</h3>
              <p className="timeline__description">{milestone.description}</p>
              <div className="timeline__tags">
                {milestone.tags.map((tag) => (
                  <span key={tag} className="project-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
