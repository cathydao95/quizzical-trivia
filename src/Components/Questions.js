import { nanoid } from "nanoid";

function Questions(props) {
  return (
    <div className="quiz-container">
      <h2 className="quiz-question">{props.question}</h2>
      <div className="quiz-answers">{props.answers}</div>
    </div>
  );
}

export default Questions;
