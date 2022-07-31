import React, { Component } from "react";
import "../App.css";

function Lettre(props) {
  if (props.verifieAtt) {
    if (props.currentWord.includes(props.playerGuess)) {
      if (props.playerGuess === props.currentWord[props.index]) {
        return (
          <div className="lettre">
            <p className="default green-overlay">{props.playerGuess} </p>
          </div>
        );
      } else {
        return (
          <div className="lettre">
            <p className="default yellow-overlay">{props.playerGuess} </p>
          </div>
        );
      }
    } else {
      return (
        <div className="lettre">
          <p className="default grey-overlay">{props.playerGuess} </p>
        </div>
      );
    }
  } else {
    return (
      <div className="lettre">
        <p className="default">{props.playerGuess} </p>
      </div>
    );
  }
}

class Attempt extends Component {
  render() {
    return (
      <div className="attempt">
        <p>{this.props.verifieAtt}</p>

        {this.props.attempt.map((square, index) => {
          return (
            <Lettre
              key={index}
              index={index}
              playerGuess={this.props.attempt[index]}
              currentWord={this.props.currentWord}
              verifieAtt={this.props.verifieAtt}
            />
          );
        })}
      </div>
    );
  }
}

export default Attempt;
