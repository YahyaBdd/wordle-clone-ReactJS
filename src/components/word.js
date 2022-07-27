import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Square(props) {
    const [isCorrect, setIsCorrect] = useState();
    let bgColor = null;
    if (isCorrect == 'true') { bgColor = 'green'; }
    else if (isCorrect == 'notOrdered') { bgColor = 'yellow'; }
    else if (isCorrect == 'false') { bgColor = 'red'; }
    return ( 
    <div style={{width:'125px', height:'125px'}}>
        <p style={{width:'100%',height:'100%', backgroundColor: {bgColor},border:'3px', borderStyle:'solid'}}>{props.lettre} </p>
    </div>   
    );
    
}
class Word extends Component {

  render() {

    
    return (
      <div style={{display:'flex',flexDrection: 'row'}}>
        
        {this.props.attempt.map((square, index) => { return <Square lettre={this.props.attempt[index]} /> })}          
      </div>
    );
  }
}

export default Word;
