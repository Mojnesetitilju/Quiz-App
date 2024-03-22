import { useEffect } from "react";

export default function countdown(
  setValue,
  setStats,
  setIndex,
  questions,
  value,
  index,
  clearInterval,
  setEnd,

  setCurrentQuestion,
  setArrayOfAnswers,
  setButtonColors,

  setCheckedAnswer,
  checkedAnswer
) {
  useEffect(() => {
    const last = questions.length - 1;
    const interval = setInterval(() => {
      if (value > 0) {
        setValue((prevValue) => prevValue - 1);
      } else {
        if (index === last) {
          clearInterval(interval);

          setStats((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
        } else {
          setIndex((prevIndex) => prevIndex + 1);
          setValue(15);
          setStats((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
        }
      }
    }, 1000);

    if (checkedAnswer === true || checkedAnswer === false) {
      if (index === last) {
        clearInterval(interval);
        setTimeout(() => {
          setEnd(true);
          setValue(0);
          setCurrentQuestion(null);
          setArrayOfAnswers(null);
          setButtonColors("btn-neutral");
        }, 2000);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIndex((prevIndex) => prevIndex + 1);
          setCheckedAnswer(null);
          setValue(15);
          setButtonColors("btn-neutral");
        }, 2000);
      }
    }

    return () => clearInterval(interval);
  }, [questions, index, value, checkedAnswer]);
}
