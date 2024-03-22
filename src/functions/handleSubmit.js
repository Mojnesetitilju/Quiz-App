function handleSubmit(e, numb, category, difficulty, setUrlPath, newToken) {
  e.preventDefault();
  const url = `https://opentdb.com/api.php?amount=${numb}&token=${newToken}&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`;

  setUrlPath(() => {
    if (numb === "" || category === "" || difficulty === "") {
      alert("Select all options");
    } else {
      return url;
    }
  });
}

export default handleSubmit;
