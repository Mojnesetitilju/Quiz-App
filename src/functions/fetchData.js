export async function fetchData(urlPath, newToken, setNewToken, setResponse) {
  if (!newToken) {
    const tokenResponse = await fetch(
      "https://opentdb.com/api_token.php?command=request"
    );
    const tokenData = await tokenResponse.json();

    setNewToken(tokenData.token);
  }

  if (urlPath) {
    const response = await fetch(urlPath);
    const data = await response.json();

    if (data.response_code === 0) {
      setResponse(data);
    } else if (data.response_code === 4) {
      await fetch(
        `https://opentdb.com/api_token.php?command=reset&token=${newToken}`
      );
    } else {
      const newTokenResponse = await fetch(
        "https://opentdb.com/api_token.php?command=request"
      );
      const newTokenData = await newTokenResponse.json();
      setNewToken(newTokenData.token);
    }
  }
}
