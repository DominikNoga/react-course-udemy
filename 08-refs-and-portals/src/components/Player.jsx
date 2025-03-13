import { useState, useRef } from "react";

const INIT_NAME = 'unknown entity';

export default function Player() {
  /**
   * {
   *  current: refValue // for example referenced input
   * }
   */
  const playerNameInput = useRef();
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = () => {
    // native input element
    setPlayerName(playerNameInput.current.value);
    playerNameInput.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {playerName !== '' ? playerName : INIT_NAME}</h2>
      <p>
        <input
          ref={playerNameInput}
          type="text"
        />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
