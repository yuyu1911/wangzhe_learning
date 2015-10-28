'use strict';
let React = require('react');
let ReactDOM = require('react-dom');
let TypeSelector = require('./chart/typeselector');
let ChartStyle = require('../styles/chart.css');
let WZReactHighCharts = require('./chart/highcharts');
let brace = require('brace');
let AceEditor = require('react-ace');
let $ = require('jquery');

require('brace/mode/javascript');
require('brace/theme/solarized_dark');

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

  handleChange(value) {
    this.props.onChangeData(value);
  }

  handlePaste(value) {
    let editor = ace.edit('brace-editor');
    let self = this;
    setTimeout(() => {
      self.formatCode(value.text);
    }, 0);
  }

  formatCode(value) {
    let editor = ace.edit('brace-editor');
    try {
      let o = JSON.parse(value ? value : editor.session.getValue());
      editor.session.setValue(JSON.stringify(o, null, 2));
    } catch(e) {
      // NOTING..
    }
  }

  componentDidUpdate() {
    this.formatCode();
  }

  handleLoad() {
    let editor = ace.edit('brace-editor');
    editor.commands.addCommand({
      name: 'Full Screen',
      bindKey: {win: 'Ctrl-B', mac: 'Command-B'},
      exec(editor) {
        let maxLines = editor.getOption('maxLines');
        editor.setOptions({
          maxLines: isFinite(maxLines) ? Infinity : 30
        });
      }
    });
  }

  render() {
    return (
      <AceEditor value={ this.props.initialData }
                  onChange={ this.handleChange.bind(this) }
                  onLoad={ this.handleLoad.bind(this) }
                  onPaste={ this.handlePaste.bind(this) }
                  mode='javascript'
                  theme='solarized_dark'
                  editorProps={{$blockScrolling: Infinity}}
                  width='100%'
                  showGutter={ false }
                  maxLines={ 30 }
                  tabSize={ 2 }>
      </AceEditor>
    );
  }
};

class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentValue: this.props.initialItems[0].value,
      drawValue: this.props.initialItems[0].value,  // 主动在 draw 方法调用时才更新
      currentData: '',
      drawData: {}
    };
  }

  completed(value) {
    this.setState({
      currentValue: value
    });
  }

  draw() {
    // 根据当前的 currentValue 绘制
    try {
      this.setState({
        drawValue: this.state.currentValue,
        drawData: JSON.parse(this.state.currentData)
      });
    } catch(e) {
      alert('数据格式不正确');
    }
  }

  changeData(data) {
    this.setState({
      currentData: data
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 考虑到每次 State 的更新 都会导致 WZReactHighCharts 的重绘
    if (nextState.drawValue !== this.state.drawValue ||
        !Object.is(nextState.drawData, this.state.drawData)) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <DataArea initialData={this.state.currentData} onChangeData={this.changeData.bind(this)}/>
        <TypeSelector items={ this.props.initialItems } onCompleted={ this.completed.bind(this) }/>
        <SaveButton onDraw={ this.draw.bind(this) }/>
        <WZReactHighCharts type={ this.state.drawValue } seriesData={ this.state.drawData }></WZReactHighCharts>
      </div>
    );
  }

  componentDidMount() {
    let self = this;
    $.get('/data.json', {
      contentType: 'json',
      timeout: 5000
    })
    .success(function(returnData) {
      self.setState({
        drawData: returnData,
        currentData: JSON.stringify(returnData)
      });
    })
    .error(function(xhr, textStatus, error) {
      console.log(error);
    })
  }
};

let items = [
  {value: 'line', typeName: '折线图'},
  {value: 'column', typeName: '柱状图'},
  {value: 'area', typeName: '区域图'}
];

ReactDOM.render(<Chart initialItems={ items }/>, document.querySelector('#container'));
