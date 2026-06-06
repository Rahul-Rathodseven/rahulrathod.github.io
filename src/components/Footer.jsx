import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__social">
          <a
            href="#"
            className="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <SiGithub />
          </a>
          <a
            href="#"
            className="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:rahul@example.com"
            className="footer__social-link"
            aria-label="Email"
          >
            <HiOutlineMail />
          </a>
        </div>

        <p className="footer__tagline">
          Building the Future with Intelligent Systems
        </p>

        <p className="footer__credit">
          © {currentYear} Designed and Engineered by{' '}
          <span className="footer__credit-name">Rahul Rathod</span>
        </p>
      </div>
    </footer>
  );
}
