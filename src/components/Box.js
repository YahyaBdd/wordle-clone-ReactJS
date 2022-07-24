import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import Word from './word';

class Box extends Component {
    
  state = {
        
        attempt: 0,
        lettre: 0,
      }         
    
    render() {
      console.log('attempts'+this.props.nbrAttempts)
      var grid = Array(this.props.nbrAttempts).fill(0).map(row => new Array(this.props.wordLenght).fill(' '))
      console.log(grid)
      
    return (
      <div style={{display:'flex',flexDirection:'column'}} >
         {grid.map((attempt,index)=>{ return(<Word/>) })}
      </div>
    );
  }
}

export default Box;
