function Questions(props) {
  let bgColor;
  // background color of answer if selected dependent selected and on scored or not scored
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
        {/* map through each answer and on click, run handleSelected function. Also if answer is selected, determine background color */}
        {props.item.answers.map((ans) => {
          return (
            <p
              style={{ backgroundColor: ans.isSelected && bgColor }}
              key={ans.id}
              // pass in current clicked quesion id and selected answer id
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
