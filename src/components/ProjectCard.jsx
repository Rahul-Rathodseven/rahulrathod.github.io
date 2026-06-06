import { motion } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import { TbBrain } from 'react-icons/tb';

export default function ProjectCard({ project, index, onClick }) {
  return (
    <motion.div
      className="project-card glass-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      onClick={onClick}
    >
      {/* Visual header */}
      <div className="project-card__visual">
        <div
          className="project-card__gradient"
          style={{
            background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)`,
          }}
        />
        <div className="project-card__visual-pattern" />
        <div className="project-card__visual-icon">
          <TbBrain />
        </div>
        <div className="project-card__arrow">
          <HiArrowUpRight />
        </div>
      </div>

      {/* Card body */}
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__subtitle">{project.subtitle}</p>
        <div className="project-card__tags">
          {project.techStack.map((tech) => (
            <span key={tech} className="project-card__tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
