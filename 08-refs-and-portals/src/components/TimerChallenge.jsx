import React, { useState, useRef } from 'react'
import ResultModal from './ResultModal';

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const dialogRef = useRef();

    const [timerExpired, setTimerExpired] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const handleStart = () => {
        setGameStarted(true);
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            dialogRef.current.showModal();
        }, targetTime * 1000);
    };

    const handleStop = () => {
        clearTimeout(timer.current);
    };

    return (
        <>
            <ResultModal ref={dialogRef} result={'lost'} targetTime={targetTime} />
            <section className='challenge'>
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={gameStarted ? handleStop : handleStart}>
                        {gameStarted ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={gameStarted ? 'active' : undefined}>
                    {
                        gameStarted ?
                            'Time is running...' : 'Timer inactive'
                    }
                </p>
            </section>
        </>

    )
}
