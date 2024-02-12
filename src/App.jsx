import { useEffect, useState } from "react";
import { useLocalStorage } from "./local storage hook/useLocalStorage";
import Questions from "./Questions";

function App() {
  const [urlPath, setUrlPath] = useState(``);
  const [numb, setNumb] = useState(``);
  const [category, setCategory] = useState(``);
  const [difficulty, setDifficulty] = useState(``);
  const [response, setResponse] = useState(null);
  const [newToken, setNewToken] = useLocalStorage(`token`);

  useEffect(() => {
    if (!newToken) {
      fetch("https://opentdb.com/api_token.php?command=request")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setNewToken(data.token);
        });
    }

    if (!urlPath) {
      return;
    } else {
      fetch(urlPath)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setResponse(() => {
            if (data.response_code === 0) {
              return data;
            } else {
              if (data.response_code === 4) {
                fetch(
                  `https://opentdb.com/api_token.php?command=reset&token=${newToken}`
                );
              } else {
                fetch("https://opentdb.com/api_token.php?command=request")
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    setNewToken(data.token);
                  });
              }
            }
          });
        });
    }
  }, [urlPath, newToken]);
  console.log(newToken);
  function handleSubmit(e) {
    e.preventDefault();
    const url = `https://opentdb.com/api.php?amount=${numb}&token=${newToken}&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`;
    setUrlPath(() => {
      if (numb === "" || category === "" || difficulty === "") {
        alert("Select somethig");
      } else {
        return url;
      }
    });
  }

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
              onSubmit={handleSubmit}
            >
              <select
                className="select select-primary w-full max-w-xs"
                onChange={(e) => setNumb(e.target.value)}
              >
                <option disabled selected>
                  Number Of Questions
                </option>
                <option value={`10`}>10</option>
                <option value={"15"}>15</option>
                <option value={"20"}>20</option>
                <option value={"25"}>25</option>
              </select>
              <select
                className="select select-secondary w-full max-w-xs"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option disabled selected>
                  Select Category
                </option>
                <option value={"9"}>General Knowledge</option>
                <option value={"11"}>Film</option>
                <option value={"12"}>Music</option>
                <option value={"17"}>Science & Nature</option>
                <option value={"21"}>Sports</option>
                <option value={"22"}>Geography</option>
                <option value={"23"}>History</option>
                <option value={"27"}>Animals</option>
              </select>
              <select
                className="select select-accent w-full max-w-xs"
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option disabled selected>
                  Select Difficulty
                </option>
                <option value={"easy"}>Easy</option>
                <option value={"medium"}>Medium</option>
                <option value={"hard"}>Hard</option>
              </select>
              <button className="btn btn-neutral">Start New Game</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
