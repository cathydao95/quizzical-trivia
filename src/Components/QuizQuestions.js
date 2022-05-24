import { useState, useEffect } from "react";

function QuizQuestions(props) {
  return (
    <div>
      <h2>{props.question}</h2>
      <h3>{props.answers}</h3>
    </div>
  );
}

export default QuizQuestions;
