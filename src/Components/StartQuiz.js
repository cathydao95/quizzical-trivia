function StartQuiz(props) {
  return (
    <main className="main-overlay">
      <div className="main-container">
        <h1 className="quiz-title">Quizzical</h1>
        <h2 className="quiz-description">
          Let's play Trivia! See how many questions you can get correct!
        </h2>
        <button onClick={props.startGame} className="btn-start">
          Start Quiz
        </button>
      </div>
    </main>
  );
}

export default StartQuiz;
