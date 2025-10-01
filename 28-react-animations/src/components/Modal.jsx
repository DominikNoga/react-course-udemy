import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  const hiddenAnimation = {
    opacity: 0,
    y: '5rem',
    scale: 0.7
  };

  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        open
        variants={{
          hidden: hiddenAnimation,
          visible: { opacity: 1, y: '0', scale: 1 }
        }}
        className="modal"
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
