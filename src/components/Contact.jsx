import { motion } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';

const contactLinks = [
  {
    icon: HiOutlineMail,
    title: 'Email',
    value: 'rahulr25022007@gmail.com',
    href: 'mailto:rahulr25022007@gmail.com',
  },
  {
    icon: FaLinkedin,
    title: 'LinkedIn',
    value: 'Connect on LinkedIn',
    href: 'https://www.linkedin.com/in/rahul-rathod-8560b3327/',
  },
  {
    icon: SiGithub,
    title: 'GitHub',
    value: 'View Repositories',
    href: 'https://github.com/Rahul-Rathodseven',
  },
];

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="section__container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Contact</span>
          <h2 className="section__title">Let&apos;s Connect</h2>
          <p className="section__subtitle">
            Interested in collaborating on AI projects or have an opportunity?
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="contact__grid">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="contact__info-text">
              I&apos;m always open to discussing AI engineering roles, machine
              learning projects, open-source collaboration, or anything related
              to building intelligent systems.
            </p>

            <div className="contact__links">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.title}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="contact__link glass-card"
                  >
                    <div className="contact__link-icon">
                      <Icon />
                    </div>
                    <div className="contact__link-details">
                      <h4>{link.title}</h4>
                      <p>{link.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            <a href="#" className="btn-primary" download style={{ alignSelf: 'flex-start' }}>
              <FiDownload />
              <span>Download Resume</span>
            </a>
          </motion.div>

          <motion.div
            className="contact__form glass-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="contact__form-group">
                <label className="contact__form-label" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="contact__form-input"
                  placeholder="Your name"
                />
              </div>
              <div className="contact__form-group">
                <label className="contact__form-label" htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="contact__form-input"
                  placeholder="your@email.com"
                />
              </div>
              <div className="contact__form-group">
                <label className="contact__form-label" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  className="contact__form-textarea"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
