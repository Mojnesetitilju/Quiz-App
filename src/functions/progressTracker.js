import { useEffect } from "react";

export default function progressTracker(questions, index, setProgress) {
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
}
