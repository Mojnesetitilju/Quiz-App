import { useEffect, useState } from "react";
import Celebration from "./Celebration";

export default function Questions({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState();
  const [question, setQuestion] = useState("");
  const [index, setIndex] = useState(0);
  const [arrayOfAnswers, setArrayOfAnswers] = useState();
  const [checkedAnswer, setCheckedAnswer] = useState(null);
  let [value, setValue] = useState(15);
  const [progress, setProgress] = useState(0);
  const [end, setEnd] = useState(false);
  let [stats, setStats] = useState({
    right: 0,
    wrong: 0,
  });
  const [buttonColors, setButtonColors] = useState(
    Array(4).fill("btn-neutral")
  );

  useEffect(() => {
    setCurrentQuestion(questions[index]);
  }, [index]);

  //shuffle questions
  useEffect(() => {
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
  }, [currentQuestion]);

  // countdown, last question, time is up
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

    // 2 sec delay after answering
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
  }, [value, index, checkedAnswer]);

  //progress bar
  useEffect(() => {
    switch (questions.length) {
      case 10:
        setProgress((index + 1) * 10);
        break;
      case 15:
        setProgress((index + 1) * 6.66);
        break;
      case 20:
        setProgress((index + 1) * 5);
        break;
      case 25:
        setProgress((index + 1) * 4);
        break;
      default:
        console.warn("Unexpected number of questions:", questions.length);
    }
  }, [questions, index]);

  function checkAnswer(v) {
    const correctIndex = arrayOfAnswers.correctIndex;
    const newButtonColors = [...buttonColors];
    if (v == correctIndex) {
      newButtonColors[v] = "btn-success";
      setCheckedAnswer(true);
      setStats((prevData) => ({ ...prevData, right: prevData.right + 1 }));
    } else {
      newButtonColors[v] = "btn-error";
      newButtonColors[correctIndex] = "btn-success";
      setCheckedAnswer(false);
      setStats((prevData) => ({ ...prevData, wrong: prevData.wrong + 1 }));
    }
    setButtonColors(newButtonColors);
  }

  return (
    <div className="flex  justify-center h-screen">
      {end ? (
        <Celebration stats={stats} />
      ) : (
        <div className="flex flex-col gap-10 justify-center text-center max-w-60 text-wrap  break-words">
          Question {index + 1}:<p>{currentQuestion && question}</p>
          <button
            value={0}
            onClick={(e) => checkAnswer(e.target.value)}
            className={`btn  ${buttonColors[0]}`}
          >
            {arrayOfAnswers && arrayOfAnswers.answers[0]}
          </button>
          <button
            value={1}
            className={`btn  ${buttonColors[1]}`}
            onClick={(e) => checkAnswer(e.target.value)}
          >
            {arrayOfAnswers && arrayOfAnswers.answers[1]}
          </button>
          <button
            value={2}
            className={`btn  ${buttonColors[2]}`}
            onClick={(e) => checkAnswer(e.target.value)}
          >
            {arrayOfAnswers && arrayOfAnswers.answers[2]}
          </button>
          <button
            value={3}
            className={`btn  ${buttonColors[3]}`}
            onClick={(e) => checkAnswer(e.target.value)}
          >
            {arrayOfAnswers && arrayOfAnswers.answers[3]}
          </button>
          <span className="countdown font-mono text-6xl span flex justify-center">
            <span style={{ "--value": value }}></span>
          </span>
          <progress
            className="progress progress-primary w-56"
            value={progress}
            max="100"
          ></progress>
          {index + 1} of {questions.length}
        </div>
      )}
    </div>
  );
}
