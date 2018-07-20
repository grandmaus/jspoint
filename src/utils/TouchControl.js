import React from 'react';
import { func } from 'prop-types';

/**
 * Extract necessary touch parameters
 * @param {TouchEvent} event
 * @returns {{windowWidth: *, windowHeight: *, x: *}}
 */
const getTouchParameters = event => {
  const { changedTouches, view: { window: { screen: { availWidth, availHeight } } } } = event;
  return {
    windowWidth: availWidth,
    windowHeight: availHeight,
    x: changedTouches[0].screenX
  };
};

/**
 * Analyze the touch event
 * and return it's direction if screen has been swiped
 * @param endTouch
 * @returns {*}
 */
const isSwipe = endTouch => {
  const { windowWidth } = endTouch;
  const diff = Math.abs(endTouch.x - startTouchEvent.x);
  const relation = diff / windowWidth * 100;
  const swiped = relation > 40;
  return swiped
    ? {
        [endTouch.x > startTouchEvent.x ? 'right' : 'left']
          : true
      }
    : false;
};

let startTouchEvent = {};

class TouchControl extends React.PureComponent {
  static propTypes = {
    onSwipeLeft: func,
    onSwipeRight: func,
    onTouchStart: func,
    onTouchEnd: func
  };

  handleTouchStart = e => {
    startTouchEvent = getTouchParameters(e);
    this.props.onTouchStart ? this.props.onTouchStart() : null;
  };

  handleTouchEnd = e => {
    const { onSwipeLeft, onSwipeRight, onTouchEnd } = this.props;
    const endTouchEvent = getTouchParameters(e);
    const shouldSwipe = isSwipe(endTouchEvent);
    if (shouldSwipe) {
      shouldSwipe.left ? onSwipeLeft() : onSwipeRight();
    }
    onTouchEnd ? onTouchEnd() : null;
  };

  render() {
    const Element = this.props.renderTo;
    return <Element onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} />;
  }
}

export default TouchControl;
