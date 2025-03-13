import React, { useState, useRef } from 'react'
import ResultModal from './ResultModal';

const INTERVAL_DURATION = 10;

export default function TimerChallenge({ title, targetTime }) {
    const interval = useRef();
    const dialogRef = useRef();
    const [remainingTime, setRemainingTime] = useState(targetTime * 1000);
    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

    if (remainingTime <= 0) {
        clearInterval(interval.current);
        dialogRef.current.open();
    }

    const handleReset = () => {
        setRemainingTime(targetTime * 1000);
    }

    const handleStart = () => {
        interval.current = setInterval(() => {
            setRemainingTime(prevTime => prevTime - INTERVAL_DURATION);
        }, INTERVAL_DURATION);
    };

    const handleStop = () => {
        clearInterval(interval.current);
        dialogRef.current.open();
    };

    return (
        <>
            <ResultModal
                ref={dialogRef}
                remainingTime={remainingTime}
                targetTime={targetTime}
                onReset={handleReset}
            />
            <section className='challenge'>
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {
                        timerIsActive ?
                            'Time is running...' : 'Timer inactive'
                    }
                </p>
            </section>
        </>

    )
}
