export default function suffleQuestions(
  currentQuestion,
  setArrayOfAnswers,
  setQuestion
) {
  if (currentQuestion) {
    setArrayOfAnswers(() => {
      const { incorrect_answers, correct_answer } = currentQuestion;
      const decodedCorrectAnswer = decodeURIComponent(correct_answer);

      const decodedArray = [
        ...incorrect_answers.map((str) => decodeURIComponent(str)),
      ];
      const allAnswers = [...decodedArray, decodedCorrectAnswer];
      for (let i = allAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
      }

      const correctIndex = allAnswers.indexOf(decodedCorrectAnswer);

      return { answers: allAnswers, correctIndex };
    });
    setQuestion(() => {
      const questionToDecode = currentQuestion.question;
      const decodedQuestion = decodeURIComponent(questionToDecode);
      return decodedQuestion;
    });
  }
}
