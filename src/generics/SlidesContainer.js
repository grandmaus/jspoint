import React, { Fragment } from 'react';
import KeyboardManager from '../utils/KeyboardManager';

class SlidesContainer extends React.Component {
  state = {
    allSlidesVisible: false,
    activeSlide: {}
  };

  componentWillMount() {
    this.showFirstSlide();
    this.props.hooks({ allSlidesVisible: this.toggleAllSlidesView });
  }

  setActiveSlide = activeSlide => {
    this.setState(() => ({
      activeSlide
    }));
    this.props.onSlideChange(activeSlide);
  };

  selectThumbnail = slide => {
    this.setActiveSlide(slide);
    this.toggleAllSlidesView();
  };

  getActiveSlideIndex = () => this.props.slides.findIndex(s => s === this.state.activeSlide);

  showNextSlide = () => {
    const isLastSlide = this.getActiveSlideIndex() === this.props.slides.length - 1;
    if (!isLastSlide) {
      const nextSlide = this.props.slides[this.getActiveSlideIndex() + 1];
      this.setActiveSlide(nextSlide);
    }
  };

  showPreviousSlide = () => {
    const isFirstSlide = this.getActiveSlideIndex() === 0;
    if (!isFirstSlide) {
      const previousSlide = this.props.slides[this.getActiveSlideIndex() - 1];
      this.setActiveSlide(previousSlide);
    }
  };

  showFirstSlide = () => {
    this.setActiveSlide(this.props.slides[0]);
  };

  showLastSlide = () => {
    this.setActiveSlide(this.props.slides[this.props.slides.length - 1]);
  };

  toggleAllSlidesView = () => {
    this.setState(state => ({
      allSlidesVisible: !state.allSlidesVisible
    }));
  };

  isAllSlidesVisible = () => this.state.allSlidesVisible;

  handleArrowDown = () => {
    if (this.isAllSlidesVisible()) this.showNextSlide();
  };
  handleArrowUp = () => {
    if (this.isAllSlidesVisible()) this.showPreviousSlide();
  };
  handleEnter = () => {
    if (this.isAllSlidesVisible()) this.toggleAllSlidesView();
  };

  renderKeyboardManager = () => (
    <KeyboardManager
      ArrowDown={this.handleArrowDown}
      ArrowUp={this.handleArrowUp}
      Home={this.showFirstSlide}
      End={this.showLastSlide}
      Enter={this.handleEnter}
      Period={this.toggleAllSlidesView}
    />
  );

  renderAllSlides = () => {
    const Container = this.props.allSlidesComponent;
    return (
      <Container
        activeSlideIndex={this.getActiveSlideIndex()}
        onSlideSelect={this.selectThumbnail}
        slides={this.props.slides}
        thumbnailComponent={this.props.thumbnailComponent}
      />
    );
  };

  renderActiveSlide = () => {
    const ActiveSlide = this.state.activeSlide;
    const SlideComponent = this.props.slideComponent;
    return (
      <Fragment>
        <SlideComponent
          slide={ActiveSlide}
          showNextSlide={this.showNextSlide}
          showPreviousSlide={this.showPreviousSlide}
        />
        {/*{this.renderPager()}*/}
      </Fragment>
    );
  };

  renderContainer = () => {
    const Container = this.props.containerComponent;
    return <Container>{this.renderActiveSlide()}</Container>;
  };

  renderPager = () => {
    const Pager = this.props.pager;
    return (
      <Pager
        activeSlideIndex={this.getActiveSlideIndex()}
        slides={this.props.slides}
        onSlideSelect={this.setActiveSlide}
      />
    );
  };

  render() {
    return (
      <Fragment>
        {this.state.allSlidesVisible ? this.renderAllSlides() : this.renderContainer()}
        {this.renderKeyboardManager()}
      </Fragment>
    );
  }
}

export default SlidesContainer;
