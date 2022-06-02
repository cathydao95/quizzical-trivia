function StartQuiz(props) {
  return (
    <div>
      <h1>Quizzical</h1>
      <p>Test your knowledge of trivia!</p>
      <button onClick={props.startQuiz}>Start Quiz</button>
    </div>
  );
}

export default StartQuiz;
