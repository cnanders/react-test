import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Square from './Square.js';
import _ from 'underscore';
import Perf from 'react-addons-perf';

// Expose the React Performance Tools on the “window” object
window.Perf = Perf;

class App extends Component {

  constructor()
  {
    super();
    var n = 500; // Number of elements to draw
    
    var squares = _.map(
      _.range(n), // [1 2 ... n] 
      function(num)
      {
        return {
          id: num,
          width: Math.round(Math.random() * 20) + 50,
          selected: false
        }
      }
    );
    this.state = {
      squares: squares,
      heightSquare: 10
    }

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * @param {Number} index - index of this.state.squares
   */
  handleClick(i)
  {
    
    console.log('App.js handleClick(' + i + ')');

    // Clone state
    var squares = this.state.squares.slice();
    squares[i].selected =  !squares[i].selected;

    // Update state
    this.setState({
      squares: squares
    });
  }

  render() {

    // Test
    var n = 6000;
    var start = new Date().getTime();
    var els = _.range(n)
    var blah;
    els.map(
      function(val)
      {
        blah = val;
      }
    );
    var end = new Date().getTime();
    var time = end - start;
    console.log('App.js() Looping through ' + n + ' items takes: ' + time + ' ms');


    var start = new Date().getTime();
    var squares = this.state.squares.map(
      function(square, i)
      {
        
        // Could do some checking in here using
        // window.x
        // window.innerWidth
        
        return(
          <Square 
            height={this.state.heightSquare}
            selected={square.selected}
            width={square.width}
            index={square.id}
            key={square.id}
            onClick={this.handleClick}
          />
        )
      },
      this
    );

    var end = new Date().getTime();
    var time = end - start;
    console.log('App.js() building <Squares> jsx: ' + time + ' ms');


    return (

      
      <div className="App">
        
        <div className="squares">
          {squares}
        </div>
        {/*
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        */}
      </div>
    );
  }
}

export default App;
