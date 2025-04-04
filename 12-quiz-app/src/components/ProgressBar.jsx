import React from 'react'
import { ANSWER_TIME } from '../const/const';
import { useState } from 'react';
import { useEffect } from 'react';
import { useImperativeHandle } from 'react';

const INTERVAL = 10;

export default function ProgressBar({ className, ref }) {
  const [remainingTime, setRemainingTime] = useState(ANSWER_TIME);

  useImperativeHandle(ref, () => ({
    reset() {
      setRemainingTime(ANSWER_TIME);
    }
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime > 0 ? prevTime - INTERVAL : 0);
    });

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <progress
      className={className}
      value={remainingTime}
      max={ANSWER_TIME} />
  )
}
