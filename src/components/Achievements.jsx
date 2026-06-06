import { motion } from 'framer-motion';
import { achievements } from '../data/achievements';
import { useCountUp } from '../hooks/useCountUp';

function AchievementCard({ achievement, index }) {
  const { count, ref } = useCountUp(achievement.number, 2000);
  const Icon = achievement.icon;

  return (
    <motion.div
      ref={ref}
      className="achievement-card glass-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <div className="achievement-card__icon">
        <Icon />
      </div>
      <div className="achievement-card__number">
        {achievement.displayValue || `${count}${achievement.suffix}`}
      </div>
      <div className="achievement-card__label">{achievement.label}</div>
      <div className="achievement-card__desc">{achievement.description}</div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section className="section" id="achievements">
      <div className="section__container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Impact</span>
          <h2 className="section__title">Featured Achievements</h2>
          <p className="section__subtitle">
            Milestones that define the journey from learner to engineer.
          </p>
        </motion.div>

        <div className="achievements__grid">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
