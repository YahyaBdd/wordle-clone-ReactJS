import React, { Component } from "react";
import Attempt from "./Attempt";
import "../App.css";

class Box extends Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {this.props.grid.map((attempt, index) => {
          return (
            <Attempt
              key={index}
              attempt={attempt}
              currentWord={this.props.currentWord}
              verifieAtt={this.props.verifieAtt[index]}
            />
          );
        })}
      </div>
    );
  }
}

export default Box;
