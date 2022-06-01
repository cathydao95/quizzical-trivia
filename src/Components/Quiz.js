import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Questions from "./Questions";
import Button from "./Button";

function Quiz(props) {
  const [quiz, setQuiz] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);

  useEffect(() => {
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
  });

  // Fisher-Yates Shuffle
  function shuffle(array) {
    let newArray = array.map((ans) => {
      return {
        id: nanoid(),
        isSelected: false,
        answer: ans,
      };
    });
    for (let i = newArray.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      newArray.push(array[randomIndex]);
      newArray.splice(randomIndex, 1);
    }
    return newArray;
  }

  function handleSelected(quesId, selectedAnswerId) {
    setQuiz((prevQuiz) => {
      return prevQuiz.map((item) => {
        if (item.id === quesId) {
          return {
            ...item,
            answers: item.answers.map((answer) => {
              return answer.id === selectedAnswerId
                ? { ...answer, isSelected: !answer.isSelected }
                : { ...answer, isSelected: false };
            }),
          };
        } else {
          return item;
        }
      });
    });
  }

  return (
    <div>
      {props.quiz.map((item) => {
        return (
          <Questions
            key={item.id}
            question={item.question}
            answers={item.answers}
          />
        );
      })}
      <Button />
    </div>
  );
}

export default Quiz;
