export default function checkAnswer(
  v,
  buttonColors,
  setCheckedAnswer,
  setStats,
  setButtonColors,
  arrayOfAnswers
) {
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
