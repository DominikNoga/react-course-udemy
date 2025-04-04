import React, { useContext } from 'react'
import QuizContext from '../store/quizContext/quizContext'
import trophy from '../assets/quiz-complete.png';

export default function QuizSummary() {
  const { results } = useContext(QuizContext);
  console.log(results);
  const getCorrectAnswersPercentage = () => {
    const answeredCorrectlyCount =
      results.reduce((totalCorrect, result) => {
        const isCorrectNumber = result.isCorrect ? 1 : 0;
        console.log(`test: ${isCorrectNumber}`);
        return totalCorrect + (result.isCorrect ? 1 : 0)
      }, 0);
    console.log(answeredCorrectlyCount);
    return Math.floor((answeredCorrectlyCount / results.length) * 100);
  }

  return (
    <div id='summary'>
      <img src={trophy} alt="trophy" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">0%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{ getCorrectAnswersPercentage() }%</span>
          <span className="text">Answered correctly</span>
        </p>
        <p>
          <span className="number">{ 100 - getCorrectAnswersPercentage() }%</span>
          <span className="text">Answered incorrectly</span>
        </p>
      </div>
      <ol>
        {
          results.map((result, index) => (
            <li key={result.question}>
              <h3>{index}</h3>
              <p className="question">
                { result.question }
              </p>
              <p className={`user-answer ${result.isCorrect ? 'correct' : 'wrong'}`}>
                { result.selectedAnswer }
              </p>
            </li>
          ))
        }
      </ol>
    </div>
  )
}
