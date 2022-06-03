function Questions(props) {
  let bgColor;
  if (props.results) {
    if (props.item.scored) {
      bgColor = "#94D7A2";
    } else {
      bgColor = "#F8BCBC";
    }
  } else {
    bgColor = "#8a9bee";
  }

  return (
    <div>
      <h1>{props.item.question}</h1>
      <div>
        {props.item.answers.map((ans) => {
          return (
            <p
              style={{ backgroundColor: ans.isSelected && bgColor }}
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
