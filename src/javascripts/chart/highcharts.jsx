'use strict';
let React = require('react');
window.HighchartsAdapter = require('exports?HighchartsAdapter!highcharts-adapters');
var Highcharts = require("highcharts");
var ReactHighcharts = require('react-highcharts');

export default class WZReactHighCharts extends React.Component {

  static propTypes = {
    type: React.PropTypes.string.isRequired
  }

  render() {

    let config = {
      chart: {
        type: this.props.type
      },
      title: {
        text: null
      },
      yAxis: {
        title: {
          text: null
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
      credits:{
        enabled:false // 禁用版权信息
      },
      series: this.props.seriesData.series
    };

    return (
      <ReactHighcharts config={ config }></ReactHighcharts>
    );
  }
};
