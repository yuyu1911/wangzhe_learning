'use strict';

let React = require('react');
let ReactDOM = require('react-dom');

class TypeSelectorItem extends React.Component {

  static propTypes = {
    value: React.PropTypes.string.isRequired,
    typeName: React.PropTypes.string.isRequired,
    onChangeValue: React.PropTypes.func.isRequired
  }

  selectedValue(e) {
    e.preventDefault();
    this.props.onChangeValue(
      e.target.getAttribute('alt'),
      e.target.innerText
    );
  }

  render() {
    return (
      <li>
        <a href='#'
            onClick={ this.selectedValue.bind(this) }
            alt={ this.props.value }>{ this.props.typeName }</a>
      </li>
    );
  }
};

export default class TypeSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentValue: this.props.items[0].typeName,
      trigger: true
    }
  }

  static propTypes = {
    items: React.PropTypes.array.isRequired,
    onCompleted: React.PropTypes.func.isRequired
  }

  changeValue(value, typeName) {
    this.props.onCompleted(value);
    this.setState({
      currentValue: typeName,
      trigger: !this.state.trigger
    });
  }
  listTrigger() {
    this.setState({
      trigger: !this.state.trigger
    }, this.moveToButton);
  }

  renderItem() {
    return this.props.items.map((item, i) => {
      return (
        <TypeSelectorItem
          key={ 'typeselectoritem-' + i }
          value={ item.value }
          typeName={ item.typeName }
          onChangeValue={ this.changeValue.bind(this) }
        ></TypeSelectorItem>
      );
    });
  }

  render() {
    let listTriggerClassName = this.state.trigger ? 'hide' : '';
    let showArrowClassName = this.state.trigger ? 'down' : 'up';
    return (
      <div className='selector-shell'>
        <div className={'selector-show arrow ' + showArrowClassName } onClick={ this.listTrigger.bind(this) }>{ this.state.currentValue }</div>
        <div className={'selector-list-shell trigger ' + listTriggerClassName}>
          <ul>
            { this.renderItem() }
          </ul>
        </div>
      </div>
    );
  }

  moveToButton() {
    let elem = ReactDOM.findDOMNode(this).querySelector('.selector-list-shell');
    elem.style.marginBottom = -1 * parseInt(elem.offsetHeight, 10) + 'px';
  }

  componentDidMount() {
    this.moveToButton();
  }

};
