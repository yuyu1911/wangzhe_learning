'use strict';
var CM = require('codemirror');
var React = require('react');
var ReactDOM = require('react-dom');

var CodeMirror = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func,
    onFocusChange: React.PropTypes.func,
    options: React.PropTypes.object,
    path: React.PropTypes.string,
    value: React.PropTypes.string
  },

  getInitialState () {
    return {
      isFocused: false
    };
  },

  componentDidMount () {
    var textareaNode = ReactDOM.findDOMNode(this.refs.textarea);
    this.codeMirror = CM.fromTextArea(textareaNode, this.props.options);
    this.codeMirror.on('change', this.codemirrorValueChanged);
    this.codeMirror.on('focus', this.focusChanged.bind(this, true));
    this.codeMirror.on('blur', this.focusChanged.bind(this, false));
    this._currentCodemirrorValue = this.props.value;
    this.codeMirror.setValue(this.props.value);
    this.pasteHandle();
    this.keymapFullScreen();
  },

  componentWillUnmount () {
    if (this.codeMirror) {
      this.codeMirror.toTextArea();
    }
  },

  componentWillReceiveProps (nextProps) {
    if (this.codeMirror && this._currentCodemirrorValue !== nextProps.value) {
      this.codeMirror.setValue(nextProps.value);
    }
    if (typeof nextProps.options === 'object') {
      for (var optionName in nextProps.options) {
        if (nextProps.options.hasOwnProperty(optionName)) {
          this.codeMirror.setOption(optionName, nextProps.options[optionName]);
        }
      }
    }
  },

  getCodeMirror () {
    return this.codeMirror;
  },

  focus () {
    if (this.codeMirror) {
      this.codeMirror.focus();
    }
  },

  focusChanged (focused) {
    this.setState({
      isFocused: focused
    });
    this.props.onFocusChange && this.props.onFocusChange(focused);
  },

  codemirrorValueChanged (doc, change) {
    var newValue = doc.getValue();
    this._currentCodemirrorValue = newValue;
    this.props.onChange && this.props.onChange(newValue);
  },

  pasteHandle () {
    this.codeMirror.getWrapperElement().addEventListener('paste', (e) => {
      this.props.onPaste && this.props.onPaste(this.codeMirror.getValue(), this.codeMirror);
    });
  },

  keymapFullScreen() {
    this.codeMirror.addKeyMap({
      'Ctrl-Alt-B': (cm) => {
        if (document.querySelector('.CodeMirror').style.height !== '100%') {
          cm.setSize('100%', '100%');
        } else {
          cm.setSize('100%', this.props.options.height);
        }
      }
    });
  },

  render () {
    var className = 'ReactCodeMirror';
    if (this.state.isFocused) {
      className += ' ReactCodeMirror--focused';
    }
    return (
      <div className={className}>
        <textarea ref="textarea" name={this.props.path} defaultValue={''} autoComplete="off" />
      </div>
    );
  }

});

module.exports = CodeMirror;
