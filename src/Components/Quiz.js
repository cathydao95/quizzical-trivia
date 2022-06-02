import Questions from "./Questions";
import Button from "./Button";

function Quiz(props) {
  return (
    <div>
      {props.quiz.map((item) => {
        return (
          <Questions
            key={item.id}
            item={item}
            handleSelected={props.handleSelected}
          />
        );
      })}
      <Button
        checkAnswers={props.checkAnswers}
        restartQuiz={props.restartQuiz}
        results={props.results}
      />
    </div>
  );
}

export default Quiz;
