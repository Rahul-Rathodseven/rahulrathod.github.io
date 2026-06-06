import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="loading-screen__name"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        RAHUL
      </motion.div>

      <motion.div
        className="loading-screen__role"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        AI ENGINEER
      </motion.div>

      <motion.div
        className="loading-screen__tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        BUILDING INTELLIGENT SYSTEMS
      </motion.div>

      <motion.div
        className="loading-screen__progress"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <motion.div
          className="loading-screen__progress-bar"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.0, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={onComplete}
        />
      </motion.div>
    </motion.div>
  );
}
