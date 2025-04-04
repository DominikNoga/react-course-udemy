import React, { useState } from 'react'
import QuizContext from './quizContext'

export default function QuizContextProvider({ children }) {
  const [results, setResults] = useState([]);

  const updateResults = (question, selectedAnswer) => {
    console.log('update in results');
    setResults(prevResults => [
      ...prevResults,
      {
        question: question.text,
        selectedAnswer,
        isCorrect: question.correctAnswer === selectedAnswer
      }
    ])
  };

  const ctxValue = {
    results,
    updateResults
  };

  return (
    <QuizContext value={ctxValue}>
      {children}
    </QuizContext>
  )
}
