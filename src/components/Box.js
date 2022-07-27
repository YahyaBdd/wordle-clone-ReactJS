import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import Word from './word';

class Box extends Component {
    
  state = {
        
        attempt: 0,
        lettre: 0,
      }         
    
    render() {
            
    return (
      <div style={{display:'flex',flexDirection:'column'}} >
         {this.props.grid.map((attempt,index)=>{ return(<Word key={index} attempt={attempt}/>) })}
      </div>
    );
  }
}

export default Box;
