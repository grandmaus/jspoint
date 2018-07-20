import React from "react";

class KeyboardManager extends React.PureComponent {
  componentWillMount() {
    window.addEventListener("keyup", this.handleKeyUp);
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp);
  }
  handleKeyUp = e => {
    if (this.props[e.code]) {
      this.props[e.code]();
    }
  };
  render() {
    return "";
  }
}

export default KeyboardManager;
