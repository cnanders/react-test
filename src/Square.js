import React, { Component } from 'react';
import WhyDidYouUpdateMixin from './WhyDidYouUpdateMixin';
import PureRenderMixin from 'react-addons-pure-render-mixin';
/*
class Square extends Component {

  constructor(props)
  {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.onClick = this.onClick.bind(this);
  }
	onClick()
	{
	  // Call out to parent, passing this id
    console.log('Square.onClick(' + this.props.index + ')');
	  this.props.onClick(this.props.index);
	}
	render() {
		var style = {
			width: this.props.width,
			height: this.props.height
		};
    var className = this.props.selected ? "selected" : "";

		return (
			<div style={style}
           className={className}
				  onClick={this.onClick}>
		  	&nbsp;
			</div>
		);
	}
}


Square.propTypes = {
	width: React.PropTypes.number,
	height: React.PropTypes.number,
	index: React.PropTypes.number,
	onClick: React.PropTypes.func,
  selected: React.PropTypes.bool
}

// Not supporte in ES6 classes

Square.mixins = [WhyDidYouUpdateMixin];
export default Square;
*/


// Eventually Facebook is dropping support but I want to use the Mixin
const Square = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    index: React.PropTypes.number,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool
  },
  mixins: [
    //WhyDidYouUpdateMixin,
    PureRenderMixin
  ],
  onClick: function(){
	  // Call out to parent, passing this id
    console.log('Square.onClick(' + this.props.index + ')');
	  this.props.onClick(this.props.index);
	},
  render: function() {
		var style = {
			width: this.props.width,
			height: this.props.height
		};
    var className = this.props.selected ? "selected" : "";

		return (
			<div style={style}
           className={className}
				  onClick={this.onClick}>
		  	&nbsp;
			</div>
		);
	}


});

export default Square