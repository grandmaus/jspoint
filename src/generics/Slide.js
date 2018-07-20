import React, { Fragment } from 'react';
import { node, func, shape, arrayOf, string, bool } from 'prop-types';
import KeyboardManager from '../utils/KeyboardManager';

class Slide extends React.Component {
  state = {
    activePoint: {}
  };

  static propTypes = {
    /*** Container provided slide object with slide data */
    slide: shape({
      title: string,
      content: string,
      list: arrayOf(string),
      image: string,
      jumbotron: bool
    }),
    /*** Container provided callback for showing next slide if there are no action items left */
    showNextSlide: func,
    /*** Container provided callback for showing previous slide if there are no action items visible */
    showPreviousSlide: func,
    /*** User provided hooks for gaining control over slide behavior */
    hooks: func,
    /*** User provided component to apply props to */
    slideComponent: func.isRequired
  };

  componentWillMount() {
    if (this.props.hooks) {
      this.applyControlHooks();
    }
  }

  applyControlHooks() {
    this.props.hooks({ next: this.handleNextInputEvent, previous: this.handlePreviousInputEvent });
  }
  /** Event handlers */

  setActiveBulletPoint = activePoint => {
    this.setState(() => ({ activePoint }));
  };

  getActiveItemIndex = () => this.props.slide.list.indexOf(this.state.activePoint);

  getItemIndex = item => this.props.slide.list.indexOf(item);

  getActionPoints = () => this.props.slide.list;

  canGoBack = () => this.getActiveItemIndex() > -1;

  canGoForward = () => this.getActiveItemIndex() < this.getActionPoints().length - 1;

  handlePreviousInputEvent = () => {
    if (this.getActionPoints() && this.canGoBack()) {
      this.setActiveBulletPoint(this.getActionPoints()[this.getActiveItemIndex() - 1]);
    } else this.props.showPreviousSlide();
  };

  handleNextInputEvent = () => {
    if (this.getActionPoints() && this.canGoForward()) {
      this.setActiveBulletPoint(this.getActionPoints()[this.getActiveItemIndex() + 1]);
    } else this.props.showNextSlide();
  };

  /** Rendering */

  filterVisiblePoints = actionPoint => this.getItemIndex(actionPoint) <= this.getActiveItemIndex();

  getVisibleActions = () =>
    this.getActionPoints()
      ? this.props.slide.list.filter(item => this.filterVisiblePoints(item))
      : [];

  renderKeyboardManager = () => (
    <KeyboardManager
      ArrowRight={this.handleNextInputEvent}
      ArrowLeft={this.handlePreviousInputEvent}
      PageUp={this.handleNextInputEvent}
      PageDown={this.handlePreviousInputEvent}
    />
  );

  renderSlide = () => {
    const SlideComponent = this.props.slideComponent;
    return <SlideComponent slide={this.props.slide} visibleActions={this.getVisibleActions} />;
  };

  render() {
    return (
      <Fragment>
        {this.renderSlide()}
        {this.renderKeyboardManager()}
      </Fragment>
    );
  }
}

export default Slide;
