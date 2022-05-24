import { useState } from "react";
import StartQuiz from "./Components/StartQuiz";
import QuizQuestions from "./Components/QuizQuestions";
import { nanoid } from "nanoid";

function App() {
  const [game, setGame] = useState(false);
  const [quiz, setQuiz] = useState([]);

  function renderQuiz() {
    console.log("TESTING");
    setGame((prevGame) => !prevGame);
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
              incorrectAnswer: item.incorrect_answers,
              correctAnswers: item.correct_answer,
              answers: shuffle([
                ...item.incorrect_answers,
                item.correct_answer,
              ]),
            };
          })
        )
      );
  }

  console.log(quiz);

  // Fisher-Yates Shuffle
  function shuffle(array) {
    for (let i = array.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      array.push(array[randomIndex]);
      array.splice(randomIndex, 1);
    }
    return array;
  }

  // function handleSelected(quesId, selectedAnsId) {
  //   setQuiz((prevQuiz)=>{
  //     return prevQuiz.map((item)=>{
  //       if (item.id === quesId) {
  //         return {
  //           ...item,
  //           answers: item.answers.map((ans) => {
  //             return ans.id === selectedAnsId ? {...ans, isSelected: !ans.isSelected} : {...ans, isSelected: false}
  //           })
  //         }
  //       }
  //     })
  //   })

  // }

  const quizElements = quiz.map((item) => {
    return (
      <QuizQuestions
        question={item.question}
        answers={item.answers}
        key={item.id}
        // handleSelected={handleSelected}
      />
    );
  });

  console.log(quizElements);

  return (
    <main>
      <div>
        {game ? (
          <div className="container">
            {quizElements}
            <button className="btn-check">Check Answers</button>
          </div>
        ) : (
          <StartQuiz startGame={renderQuiz} />
        )}
      </div>
    </main>
  );
}

export default App;
