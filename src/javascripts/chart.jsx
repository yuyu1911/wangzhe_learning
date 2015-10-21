'use strict';
let React = require('react');
let ReactDOM = require('react-dom');
let TypeSelector = require('./chart/typeselector');
let ChartStyle = require('../styles/chart.css');

class SaveButton extends React.Component {

  static defaultProps = {
    onDraw: React.PropTypes.func.isRequired
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onDraw();
  }

  render() {
    return (
      <a href='#' className='savebutton' onClick={ this.handleClick.bind(this) }>绘制</a>
    );
  }
};

class DataArea extends React.Component {
  render() {
    return (
      <textarea className='dataarea' placeholder='数据'>
      </textarea>
    );
  }
};

class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentValue: this.props.items[0].value
    };
  }

  completed(v) {
    this.setState({
      currentValue: v
    });
  }

  draw() {
    // 根据当前的 currentValue 绘制
    console.log(this.state.currentValue);
  }

  render() {
    return (
      <div>
        <DataArea/>
        <TypeSelector items={ this.props.items } onCompleted={ this.completed.bind(this) }/>
        <SaveButton onDraw={ this.draw.bind(this) }/>
      </div>
    );
  }
};

let items = [
  {value: 'a', typeName: '折线图'},
  {value: 'b', typeName: '柱状图'},
  {value: 'c', typeName: '面积图'}
];

ReactDOM.render(<Chart items={ items }/>, document.querySelector('#container'));
