'use strict';
let React = require('react');
let ReactDOM = require('react-dom');
let TypeSelector = require('./chart/typeselector');
let ChartStyle = require('../styles/chart.css');
let WZReactHighCharts = require('./chart/highcharts');

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
      currentValue: this.props.initialItems[0].value,
      drawValue: this.props.initialItems[0].value  // 主动在 draw 方法调用时才更新
    };
  }

  completed(value) {
    this.setState({
      currentValue: value
    });
  }

  draw() {
    // 根据当前的 currentValue 绘制
    this.setState({
      drawValue: this.state.currentValue
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 考虑到每次 State 的更新 都会导致 WZReactHighCharts 的重绘
    if (nextState.drawValue === this.state.drawValue) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <DataArea/>
        <TypeSelector items={ this.props.initialItems } onCompleted={ this.completed.bind(this) }/>
        <SaveButton onDraw={ this.draw.bind(this) }/>
        <WZReactHighCharts type={ this.state.drawValue }></WZReactHighCharts>
      </div>
    );
  }
};

let items = [
  {value: 'line', typeName: '折线图'},
  {value: 'column', typeName: '柱状图'},
  {value: 'area', typeName: '区域图'}
];

ReactDOM.render(<Chart initialItems={ items }/>, document.querySelector('#container'));
