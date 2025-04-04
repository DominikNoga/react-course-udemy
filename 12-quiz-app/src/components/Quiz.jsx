import React, { useContext } from 'react'
import ProgressBar from './ProgressBar'
import { useState } from 'react';
import { QUESTIONS } from '../const/questions';
import QuestionTile from './QuestionTile';
import { useRef } from 'react';
import QuizContext from '../store/quizContext/quizContext';
import QuizSummary from './QuizSummary';

export default function Quiz() {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const quizFinished = currentQuestionNumber >= QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentQuestionNumber];
  const { updateResults } = useContext(QuizContext);
  const progressBarRef = useRef();

  const onSelectQuestion = (selectedAnswer) => {
    progressBarRef.current.reset();
    updateResults(currentQuestion, selectedAnswer);
    setCurrentQuestionNumber(prevNumber => prevNumber + 1);
  };

  const getShuffledAnswers = () => {
    let answers = [...currentQuestion.answers];
    const shuffledAnswers = [];

    for (let i = answers.length; i > 0; i--) {
      const randIndex = Math.floor(Math.random() * answers.length);
      shuffledAnswers.push({
        answer: answers[randIndex],
      });
      answers.splice(randIndex, 1);
    }

    return shuffledAnswers;
  };

  return (
    <>
      {
        quizFinished &&
          <QuizSummary />
      }

      {
        !quizFinished &&
          <div id='quiz'>
            <div id="question">
              <ProgressBar ref={progressBarRef} />
              <h2>{currentQuestion.text}</h2>
              <div id="answers">
                {
                  currentQuestion &&
                  getShuffledAnswers().map(answer => (
                    <QuestionTile
                      key={answer.answer}
                      onSelectQuestion={() => onSelectQuestion(answer.answer)}
                      question={answer.answer}
                    />
                  ))
                }
              </div>
            </div>
          </div>
      }
    </>
  )
}
