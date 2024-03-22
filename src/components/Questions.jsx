import { useEffect, useState } from "react";

import AnswerButton from "./AnswerButton";
import Celebration from "./Celebration";

import shuffleQuestions from "../functions/shuffleQuestions";
import countdown from "../functions/countdown";
import progressTracker from "../functions/progressTracker";
import checkAnswer from "../functions/checkAnswer";

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
    shuffleQuestions(currentQuestion, setArrayOfAnswers, setQuestion);
  }, [currentQuestion]);

  countdown(
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
  );

  //progress bar

  progressTracker(questions, index, setProgress);

  return (
    <div className="flex  justify-center h-screen">
      {end ? (
        <Celebration stats={stats} />
      ) : (
        <div className="flex flex-col gap-10 justify-center text-center max-w-60 text-wrap  break-words">
          Question {index + 1}:<p>{currentQuestion && question}</p>
          {arrayOfAnswers &&
            arrayOfAnswers.answers.map((a, index) => {
              return (
                <AnswerButton
                  value={index}
                  buttonColor={buttonColors[index]}
                  checkAnswer={(v) =>
                    checkAnswer(
                      v,
                      buttonColors,
                      setCheckedAnswer,
                      setStats,
                      setButtonColors,
                      arrayOfAnswers
                    )
                  }
                  answer={a}
                  key={index}
                />
              );
            })}
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
