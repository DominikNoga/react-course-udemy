import React, { useState } from 'react'
import Player from './Player';

export default function Players() {
    const PLAYERS_IDS = {
        p1: 0,
        p2: 1
    }
    const [playersNames, setPlayersNames] = useState(['Player 1', 'Player 2'])
    const [showInput, setShowInput] = useState([false, false]);

    const toggleInputMode = (id) => {
        setShowInput((values) => values.map((show, i) => i === id ? !show : show));
    }

    const setPlayerName = (playerId, newName) => {
        setPlayersNames(names => names.map((name, i) => i === playerId ? newName : name));
    }

    const getBtnText = (isEdited) => isEdited ? 'Save' : 'Edit';

    const onBtnClick = (isEdited, id, newName = undefined) => {
        if (isEdited) {
            setPlayerName(id, newName);
            return;
        }
        toggleInputMode(id);
    }

    return (
        <ol id='players'>
            <li>
                <Player name={'Player 1'} symbol='X' />
            </li>
            <li>
                <Player name='Player 2' symbol='O' />
            </li>
        </ol>
    )
}
