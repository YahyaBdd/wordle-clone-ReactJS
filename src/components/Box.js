import React from "react";
import Attempt from "./Attempt";
import "../App.css";

function Box(props) {
  return (
    <div className="grid">
      {props.grid.map((attempt, index) => {
        return (
          <Attempt
            key={index}
            attempt={attempt}
            currentWord={props.currentWord}
            verifieAtt={props.verifieAtt[index]}
          />
        );
      })}
    </div>
  );
}

export default Box;
