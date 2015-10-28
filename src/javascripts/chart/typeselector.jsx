'use strict';

let React = require('react');
let ReactDOM = require('react-dom');

export default class TypeSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentValue: this.props.items[0].value,
    }
  }

  static propTypes = {
    items: React.PropTypes.array.isRequired,
    onCompleted: React.PropTypes.func.isRequired
  }

  changeValue(evt) {
    this.props.onCompleted(evt.target.value);
    this.setState({
      currentValue: evt.target.value
    })
  }

  renderItem() {
    return this.props.items.map((item, i) => {
      return (
        <option
          key={ 'typeselectoritem-' + i }
          value={ item.value }
        >{ item.typeName }</option>
      );
    });
  }

  render() {
    return (
      <div className='selector-shell'>
        <select value={ this.state.currentValue }
                className='selector'
                onChange={ this.changeValue.bind(this) }>
          { this.renderItem() }
        </select>
        <i className='arrow'></i>
      </div>
    );
  }

};
