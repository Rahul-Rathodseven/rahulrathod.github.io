import { motion } from 'framer-motion';
import { skillCategories } from '../data/skills';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section__container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Expertise</span>
          <h2 className="section__title">Technical Skills</h2>
          <p className="section__subtitle">
            A growing toolkit spanning AI, backend engineering, and modern DevOps.
          </p>
        </motion.div>

        <motion.div
          className="skills__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {skillCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.id}
                className="skill-category glass-card"
                variants={cardVariants}
              >
                <div className="skill-category__header">
                  <div
                    className="skill-category__icon"
                    style={{
                      background: `${category.color}15`,
                      color: category.color,
                    }}
                  >
                    <CategoryIcon />
                  </div>
                  <h3 className="skill-category__title">{category.title}</h3>
                </div>
                <motion.div
                  className="skill-category__list"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {category.skills.map((skill) => {
                    const SkillIcon = skill.icon;
                    return (
                      <motion.span
                        key={skill.name}
                        className="skill-pill"
                        variants={pillVariants}
                        whileHover={{ scale: 1.05 }}
                      >
                        <SkillIcon />
                        {skill.name}
                      </motion.span>
                    );
                  })}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
