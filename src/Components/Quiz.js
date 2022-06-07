import Questions from "./Questions";
import Button from "./Button";

function Quiz(props) {
  return (
    <div>
      {/* map through each  quiz items */}
      {props.quiz.map((item) => {
        return (
          <Questions
            key={item.id}
            item={item}
            handleSelected={props.handleSelected}
            results={props.results}
          />
        );
      })}
      <Button
        checkAnswers={props.checkAnswers}
        restartQuiz={props.restartQuiz}
        results={props.results}
        scored={props.scored}
      />
    </div>
  );
}

export default Quiz;
