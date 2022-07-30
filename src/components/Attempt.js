import React, { Component, useState, useEffect } from "react";

function Lettre(props) {
  if (props.verifieAtt) {
    if (props.playerGuess === props.currentWord[props.index]) {
      return (
        <div style={{ width: "125px", height: "125px" }}>
          <p
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "green",
              border: "3px",
              borderStyle: "solid",
            }}
          >
            {props.playerGuess}{" "}
          </p>
        </div>
      );
    } else {
      return (
        <div style={{ width: "125px", height: "125px" }}>
          <p
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "red",
              border: "3px",
              borderStyle: "solid",
            }}
          >
            {props.playerGuess}{" "}
          </p>
        </div>
      );
    }
  } else {
    return (
      <div style={{ width: "125px", height: "125px" }}>
        <p
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            border: "3px",
            borderStyle: "solid",
          }}
        >
          {props.playerGuess}{" "}
        </p>
      </div>
    );
  }
}
class Attempt extends Component {
  render() {
    return (
      <div style={{ display: "flex", flexDrection: "row" }}>
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
