import React, { useState } from 'react'

export default function Player({ name, symbol }) {
  const [showInput, setShowInput] = useState(false);
  const [playerName, setPlayersName] = useState(name);

  const toggleInputMode = () => {
    setShowInput((showInput) => !showInput);
  };

  const getBtnText = () => showInput ? 'Save' : 'Edit';

  const onNameChange = (event) => {
    const newName = event.target.value;
    setPlayersName(newName);
  };


  return (
    <span>
      {
        showInput ?
          <input type='text' onChange={onNameChange} placeholder={`${symbol} player's name`} value={playerName} required /> :
          <span className='player-name'>{playerName}</span>
      }
      <span className='player-symbol'>{symbol}</span>
      <button onClick={toggleInputMode}>{getBtnText()}</button>
    </span>
  )
}
