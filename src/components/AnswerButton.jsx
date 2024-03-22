export default function AnswerButton({
  value,
  buttonColor,
  checkAnswer,
  answer,
}) {
  return (
    <button
      onClick={(e) => checkAnswer(e.target.value)}
      value={value}
      className={`btn  ${buttonColor}`}
    >
      {answer}
    </button>
  );
}
