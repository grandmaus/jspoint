import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/keymap/vim';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/hopscotch.css';
import { bool, string } from 'prop-types';

class TextEditor extends React.Component {
  static propTypes = { vim: bool, initialValue: string };
  static defaultProps = { vim: false };
  /**
   * Keyup event handler
   * @param {KeyboardEvent} e
   */
  handleKeyUp = e => {
    const { code, ctrlKey } = e.nativeEvent;
    if (code === 'KeyQ' && ctrlKey) {
      this.props.close();
    }
    e.stopPropagation();
  };
  componentDidMount() {
    const keyMap = this.props.vim ? 'vim' : 'default';
    CodeMirror(document.getElementById('codemirror'), {
      value: this.props.initialValue,
      mode: 'jsx',
      keyMap
    });
  }
  render() {
    return <div id="codemirror" onKeyUp={this.handleKeyUp} />;
  }
}

export default TextEditor;
