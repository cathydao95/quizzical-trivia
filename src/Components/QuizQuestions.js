import { useState, useEffect } from "react";

function QuizQuestions(props) {
  return (
    <div className="quiz-container">
      <h2 className="quiz-question">{props.question}</h2>
      <div className="quiz-answers">
        {props.answers.map((item) => (
          <span
            // onClick={() => props.handleSelected(props.id, item.id)}
            key={item.id}
            className="answers-item"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default QuizQuestions;
