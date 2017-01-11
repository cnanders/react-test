import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Square from './Square.js';
import _ from 'underscore';
import Perf from 'react-addons-perf';
import Immutable from 'immutable';

// Expose the React Performance Tools on the “window” object
window.Perf = Perf;

class App extends Component {

  constructor()
  {
    super();
    var n = 5000; // Number of elements to draw
    
    var squares = _.map(
      _.range(n), // [1 2 ... n] 
      function(num)
      {
        return {
          id: num,
          width: Math.round(Math.random() * 2) + 5,
          selected: false
        }
      }
    );
    this.state = {
      squares: Immutable.fromJS(squares),
      heightSquare: 10,
      updates: 0
    }

    this.handleClick = this.handleClick.bind(this);
    //this.fpsTest = this.fpsTest.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.getNewSquaresState = this.getNewSquaresState.bind(this);
    this.numTests = 10;
    this.numTestsCount = 0;

    //this.fpsTest();
  }

  componentDidMount()
  {
    //this.fpsTest();
    // this.setState({
    //   squares: this.getNewSquaresState()
    // });

    
  }

  componentDidUpdate()
  {
    console.log('componetDidUpdate');
    console.log(this.numTests);
    console.log(this.numTestsCount);
    this.numTestsCount++;
    if (this.numTestsCount < this.numTests)
    {
      
      // setState() does not immediately mutate this.state but creates a pending
      // state transition. Accessing this.state after calling this method can
      // potentially return the existing value.
      //
      // There is a form of setState that takes a function and allows you to 
      // access the current state

      this.setState(function(currentState) {        
        
        console.log('componentDidUpdate setState() updates', currentState.updates);;

        return { 
          squares: this.getNewSquaresState(currentState.squares),
          updates: currentState.updates + 1
        };
      });
      
      // this.setState({
      //   squares: this.getNewSquaresState()
      // });
      this.forceUpdate();
    } 
  }
  /*
  fpsTest()
  {
    var n = 5;
    var start = new Date().getTime();
    _.times(n, (i) => {
        console.log('times ' + i);
        const squares= ;
        
    });

    var end = new Date().getTime();
    var time = end - start;
    console.log('sum time', time);
    console.log('average time', time / n);
  }
  */

  /**
   * @prop {Array} squares - the squares state
   * @return {Array} new squares state
   */
  getNewSquaresState(squares)
  {
    
    for (var n = 0; n < 50; n++)
    {
      var i = Math.round(Math.random() * 4999),
      squares = squares.updateIn([i], function(square){
        var a = square.set('selected', !square.get('selected'));
        a = a.set('width', Math.round(Math.random() * 2) + 5)
        return a;
      });
    }
    return squares;
  }

  /**
   * @param {Number} index - index of this.state.squares
   */
  handleClick(i)
  {
    
    console.log('App.js handleClick(' + i + ')');

    // Clone and update (non-Immutable)
    //var squares = this.state.squares.slice();
    //squares[i].selected =  !squares[i].selected;

    
    /*
    // Immutable clone and modify
    var squares = this.state.squares.updateIn([i], function(square){
      return square.set('selected', !square.get('selected'));
    });

    // Update state
    this.setState({
      squares: squares
    });
    */

    this.setState({
      squares: this.getNewSquaresState(this.state.squares)
    });
  }

  testLoop()
  {
    // Test
    var n = 100;
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

  }

  
  render() {

    //testLoop();

    var start = new Date().getTime();
    var squares = this.state.squares.map(
      function(square, i)
      {
        
        // Could do some checking in here using
        // window.x
        // window.innerWidth
        
        //return('<div></div>');
        return(
          <Square 
            height={this.state.heightSquare}
            square={square}
            key={square.get('id')}
            onClick={this.handleClick}
          />
        )
      },
      this
    );

    var end1 = new Date().getTime();
    var time = end1 - start;
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
