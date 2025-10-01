import { useState } from 'react';
// Can be used to animate the conditionally rendered components
import { AnimatePresence, motion } from 'framer-motion';
import NewChallenge from './NewChallenge.jsx';

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
    {/* it will make sure that before removing the modal from DOM, if it has the exit animation defined, it will run it */}
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>
      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button
          onClick={handleStartAddNewChallenge}
          className="button"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, mass: 1.5 }}
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
