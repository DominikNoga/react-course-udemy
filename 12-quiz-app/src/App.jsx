import React from 'react'
import Header from './components/Header'
import Quiz from './components/Quiz'
import QuizContextProvider from './store/quizContext/QuizContextProvider';

export default function App() {
  return (
    <QuizContextProvider>
      <Header />
      <main>
        <Quiz />
      </main>
    </QuizContextProvider>
  )
}

