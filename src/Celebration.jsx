import React, { useRef } from "react";
import Confetti from "react-confetti";

export default function Celebration({ stats }) {
  let right = stats.right;
  let wrong = stats.wrong;

  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);
  return (
    <>
      <div className="flex flex-col justify-center align-middle h-svh gap-20">
        <p className="rounded-xl font-mono text-xl bg-green-700 p-5">
          Correct Answers:{right}
        </p>
        <p className="rounded-xl font-mono text-xl bg-red-700 p-5">
          Wrong Answers: {wrong}
        </p>
        <button className="btn btn-neutral">
          <a href="/">New Game</a>
        </button>
      </div>
      <Confetti
        width={windowWidth.current}
        height={windowHeight.current}
        numberOfPieces={50}
      />
    </>
  );
}
