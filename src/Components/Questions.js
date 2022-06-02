function Questions(props) {
  return (
    <div>
      <h1>{props.item.question}</h1>
      <div>
        {props.item.answers.map((ans) => {
          return (
            <p
              key={ans.id}
              onClick={() => props.handleSelected(props.item.id, ans.id)}
            >
              {ans.answer}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Questions;
