import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiArrowDown, HiOutlineMail } from 'react-icons/hi';
import { FiDownload } from 'react-icons/fi';
import HeroScene from './HeroScene';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero({ mouse }) {
  return (
    <section className="hero" id="home">
      {/* Background gradient orbs */}
      <div className="hero__gradient-orb hero__gradient-orb--1" />
      <div className="hero__gradient-orb hero__gradient-orb--2" />

      <div className="hero__container">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero__identifier" variants={itemVariants}>
            Rahul Rathod
          </motion.div>

          <motion.h1 className="hero__name" variants={itemVariants}>
            Building Intelligent{' '}
            <span className="hero__headline-accent">Systems</span>
          </motion.h1>

          <motion.p className="hero__headline" variants={itemVariants}>
            with AI, Machine Learning{' '}
            <br />
            &amp; Modern Software Engineering
          </motion.p>

          <motion.div className="hero__role" variants={itemVariants}>
            <span>AI Engineer</span>
            <span className="hero__role-dot" />
            <span>Full Stack Developer</span>
            <span className="hero__role-dot" />
            <span>ML Enthusiast</span>
          </motion.div>

          <motion.div className="hero__cta" variants={itemVariants}>
            <a href="#projects" className="btn-primary">
              <span>View Projects</span>
              <HiArrowDown />
            </a>
            <a href="#contact" className="btn-ghost">
              <HiOutlineMail />
              Contact Me
            </a>
            <a href="#" className="btn-ghost" download>
              <FiDownload />
              Resume
            </a>
          </motion.div>
        </motion.div>

        <HeroScene mouse={mouse} />
      </div>
    </section>
  );
}
