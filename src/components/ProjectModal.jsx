import { motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';

export default function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="project-modal__overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="project-modal"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-modal__header">
          <button className="project-modal__close" onClick={onClose}>
            <HiX />
          </button>
          <h2 className="project-modal__title">{project.title}</h2>
          <p className="project-modal__subtitle">{project.subtitle}</p>
        </div>

        <div className="project-modal__body">
          <p className="project-modal__description">{project.description}</p>

          <h4 className="project-modal__section-title">Key Features</h4>
          <ul className="project-modal__features">
            {project.features.map((feature, i) => (
              <li key={i} className="project-modal__feature">
                {feature}
              </li>
            ))}
          </ul>

          <h4 className="project-modal__section-title">Technology Stack</h4>
          <div className="project-modal__tech">
            {project.techStack.map((tech) => (
              <span key={tech} className="skill-pill">
                {tech}
              </span>
            ))}
          </div>

          <div className="project-modal__actions">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <SiGithub />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
