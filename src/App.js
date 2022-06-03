import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Quiz from "./Components/Quiz";
import StartQuiz from "./Components/StartQuiz";

function App() {
  const [quiz, setQuiz] = useState([]);
  const [results, setResults] = useState(false);
  const [scored, setScored] = useState(0);

  function startQuiz() {
    renderQuiz();
  }

  function renderQuiz() {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) =>
        setQuiz(
          data.results.map((item) => {
            return {
              id: nanoid(),
              question: item.question,
              correctAnswer: item.correct_answer,
              answers: shuffle([
                ...item.incorrect_answers,
                item.correct_answer,
              ]),
              isAttemped: false,
              scored: false,
            };
          })
        )
      );
  }

  function shuffle(arr) {
    let array = arr.map((ans) => {
      return {
        id: nanoid(),
        isSelected: false,
        answer: ans,
      };
    });
    for (let i = array.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      array.push(array[randomIndex]);
      array.splice(randomIndex, 1);
    }
    return array;
  }

  function handleSelected(questionId, answerId) {
    console.log(questionId, answerId);
    setQuiz((prevQuiz) =>
      prevQuiz.map((item) => {
        return item.id === questionId
          ? {
              ...item,
              answers: item.answers.map((ans) => {
                return ans.id === answerId
                  ? { ...ans, isSelected: !ans.isSelected }
                  : { ...ans, isSelected: false };
              }),
              scored:
                item.correctAnswer ===
                item.answers.find((ans) => ans.id === answerId).answer,
              isAttemped: !item.isAttemped,
            }
          : item;
      })
    );
  }

  function checkAnswers() {
    console.log("checking");
    const allSelected = quiz.map((item) =>
      item.answers.some((ans) => ans.isSelected)
    );
    const allQuestionsSelected = allSelected.every((item) => item);
    if (allQuestionsSelected) {
      let scored = quiz.filter((item) => item.scored);
      setScored(scored.length);
      setResults(true);
      console.log(scored.length);
    } else {
      alert("please attempt all questions");
    }
  }

  function restartQuiz() {
    console.log("restart quiz");
    setQuiz([]);
    setResults(false);
    setScored(0);
    startQuiz();
  }
  return (
    <div>
      <div>
        {quiz.length ? (
          <Quiz
            quiz={quiz}
            handleSelected={handleSelected}
            checkAnswers={checkAnswers}
            restartQuiz={restartQuiz}
            results={results}
            scored={scored}
          />
        ) : (
          <StartQuiz startQuiz={startQuiz} />
        )}
      </div>
    </div>
  );
}
export default App;
