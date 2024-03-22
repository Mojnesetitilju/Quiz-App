import { useEffect, useState } from "react";
import useLocalStorage from "./hook/useLocalStorage";

import SelectBtn from "./components/SelectBtn";
import Questions from "./components/Questions";

import { fetchData } from "./functions/fetchData";
import handleSubmit from "./functions/handleSubmit";
import {
  numberOfQuestions,
  categorySelect,
  difficultySelect,
} from "./values/optionValues";

function App() {
  const [urlPath, setUrlPath] = useState(``);
  const [numb, setNumb] = useState(``);
  const [category, setCategory] = useState(``);
  const [difficulty, setDifficulty] = useState(``);
  const [response, setResponse] = useState(null);
  const [newToken, setNewToken] = useLocalStorage(`token`);

  useEffect(() => {
    fetchData(urlPath, newToken, setNewToken, setResponse);
  }, [urlPath]);

  return (
    <>
      {response ? (
        <Questions questions={response.results} />
      ) : (
        <div className="flex  flex-col justify-center align-middle h-svh">
          <div>
            <h1 className="text-6xl my-8 text-center">Quizz App</h1>
          </div>
          <div className="flex justify-center my-20">
            <form
              className="flex flex-col align-middle gap-5"
              onSubmit={(e) =>
                handleSubmit(
                  e,
                  numb,
                  category,
                  difficulty,
                  setUrlPath,
                  newToken
                )
              }
            >
              <SelectBtn
                optionName={` Number Of Questions`}
                optionValue={numberOfQuestions}
                setFunc={setNumb}
              />
              <SelectBtn
                optionName={`Select Category`}
                optionValue={categorySelect}
                setFunc={setCategory}
              />
              <SelectBtn
                optionName={`Select Difficulty`}
                optionValue={difficultySelect}
                setFunc={setDifficulty}
              />
              <button className="btn btn-neutral">Start New Game</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
