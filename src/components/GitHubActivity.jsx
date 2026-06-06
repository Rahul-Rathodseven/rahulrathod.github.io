import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';

const learningTopics = [
  'Python',
  'Data Structures & Algorithms',
  'Machine Learning',
  'Deep Learning',
  'FastAPI',
  'PyTorch',
  'MLOps',
  'German Language',
];

export default function GitHubActivity() {
  // Generate a realistic-looking contribution heatmap
  const heatmapData = useMemo(() => {
    const cells = [];
    for (let week = 0; week < 52; week++) {
      for (let day = 0; day < 7; day++) {
        // Create a pattern: more activity in recent weeks, with Python challenge visible
        const recency = week / 52;
        const baseActivity = recency * 0.6;
        const random = Math.random();
        let level = 0;
        
        if (random < baseActivity + 0.1) level = 1;
        if (random < baseActivity * 0.6) level = 2;
        if (random < baseActivity * 0.4) level = 3;
        if (random < baseActivity * 0.2) level = 4;
        
        // Boost recent weeks for the 100+ day challenge
        if (week > 38 && random < 0.7) level = Math.max(level, 2);
        if (week > 44 && random < 0.8) level = Math.max(level, 3);
        
        cells.push({ week, day, level });
      }
    }
    return cells;
  }, []);

  return (
    <section className="section" id="github">
      <div className="section__container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Activity</span>
          <h2 className="section__title">Current Learning Journey</h2>
          <p className="section__subtitle">
            Active growth across AI, software engineering, and beyond.
          </p>
        </motion.div>

        <div className="github__content">
          {/* Contribution Heatmap */}
          <motion.div
            className="github__heatmap glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="github__heatmap-grid">
              {heatmapData.map((cell, i) => (
                <div
                  key={i}
                  className={`github__heatmap-cell ${
                    cell.level > 0 ? `github__heatmap-cell--l${cell.level}` : ''
                  }`}
                  title={`Week ${cell.week + 1}, Day ${cell.day + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="github__stats"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="github__stat glass-card">
              <div className="github__stat-number">15+</div>
              <div className="github__stat-label">Repositories</div>
            </div>
            <div className="github__stat glass-card">
              <div className="github__stat-number">500+</div>
              <div className="github__stat-label">Contributions</div>
            </div>
            <div className="github__stat glass-card">
              <div className="github__stat-number">100+</div>
              <div className="github__stat-label">Day Streak</div>
            </div>
          </motion.div>

          {/* Currently Learning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ textAlign: 'center' }}
          >
            <h3
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                marginBottom: 'var(--space-lg)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Currently Learning
            </h3>
            <div className="github__learning">
              {learningTopics.map((topic) => (
                <motion.div
                  key={topic}
                  className="github__learning-badge"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {topic}
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ marginTop: 'var(--space-2xl)', display: 'inline-flex' }}
              whileHover={{ scale: 1.02 }}
            >
              <SiGithub />
              View GitHub Profile
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
