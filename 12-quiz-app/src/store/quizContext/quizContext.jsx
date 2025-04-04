import { createContext } from "react";

const QuizContext = createContext({
  results: [],
  updateResults: (question, selectedAnswer) => {
    console.log('MOCK UPDATE');
  }
});

export default QuizContext;
