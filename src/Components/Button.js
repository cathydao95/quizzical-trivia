function Button(props) {
  return (
    <div>
      {/* if results is true, show score and play again button, else show check answers button */}
      {props.results ? (
        <div>
          <p>You scored {props.scored}/5 correct answers</p>
          <button onClick={props.restartQuiz}>Play Again</button>
        </div>
      ) : (
        <div>
          <button onClick={props.checkAnswers}>Check Answers</button>
        </div>
      )}
    </div>
  );
}

export default Button;
