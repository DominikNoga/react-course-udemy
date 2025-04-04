import { QUESTIONS } from "../../../const/questions";

export const quizContextUtils = {
  getMappedInitialQuestions: () =>
    QUESTIONS.map(question => ({
      ...question,
      correctAnswer: question.answers[0]
    })),
};
