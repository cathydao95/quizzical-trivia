import { useState } from "react";
import StartQuiz from "./Components/StartQuiz";
import Quiz from "./Components/Quiz";
import { nanoid } from "nanoid";

function App() {
  const [game, setGame] = useState(false);

  function renderQuiz() {
    setGame(true);
  }

  return (
    <main>
      <div>{game ? <Quiz /> : <StartQuiz startGame={renderQuiz} />}</div>
    </main>
  );
}

export default App;
