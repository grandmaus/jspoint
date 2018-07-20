import React, { Component, Fragment } from 'react';
import SlidesContainer from './generics/SlidesContainer';
import Slide from './components/Slide';
import MainContainer from './components/MainContainer';
import Thumbnail from './components/Thumbnail';
import AllSlides from './components/AllSlides';
import ApplicationPager from './components/ApplicationPager';
import CameraHandler from './components/ApplicationCamera';
import Slides from './web-apis';
import KeyboardManager from './utils/KeyboardManager';
import ApplicationTextEditor from './components/ApplicationTextEditor';
import ActiveSlideImage from './components/SlideImage';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Admin from './components/Admin';
import PresenterView from './components/PresenterView';
import { emit, registerWebSocketSubscription } from './utils/IO';
import EVENTS from './utils/Events';
import ActiveSlideVideo from './components/Video';
import { BSOD } from './components/bsod';

class App extends Component {
  state = {
    cameraVisible: false,
    textEditorVisible: false,
    activeSlide: {},
    activeSlideImageVisible: true,
    activeSlideImageZoom: 1,
    bsod: false
  };

  componentWillMount() {
    registerWebSocketSubscription(EVENTS.toggleCamera, this.toggleCamera);
    registerWebSocketSubscription(EVENTS.togglePicture, this.toggleActiveSlideImage);
    registerWebSocketSubscription(EVENTS.toggleEditor, this.toggleTextEditor);
    registerWebSocketSubscription(EVENTS.activePictureZoomIn, this.increaseSlideImage);
    registerWebSocketSubscription(EVENTS.activePictureZoomOut, this.decreaseSlideImage);
    registerWebSocketSubscription('NUKE', this.showBSOD);
    registerWebSocketSubscription('editor', this.toggleTextEditor);
    registerWebSocketSubscription('camera', this.toggleCamera);
  }

  showBSOD = () => {
    this.setState(() => ({
      bsod: true
    }));
  };

  applyHooks({ allSlidesVisible }) {
    registerWebSocketSubscription(EVENTS.toggleAllSlides, allSlidesVisible);
  }

  increaseSlideImage = () => {
    this.setState(state => ({
      activeSlideImageZoom: state.activeSlideImageZoom + 1
    }));
  };

  decreaseSlideImage = () => {
    this.setState(state => ({
      activeSlideImageZoom: state.activeSlideImageZoom - 1
    }));
  };

  toggleCamera = () => {
    this.setState(state => ({
      cameraVisible: !state.cameraVisible
    }));
  };

  toggleActiveSlideImage = () => {
    this.setState(state => ({
      activeSlideImageVisible: !state.activeSlideImageVisible
    }));
  };

  toggleTextEditor = () => {
    this.setState(state => ({ textEditorVisible: !state.textEditorVisible }));
  };

  setActiveSlide = activeSlide => {
    this.setState(() => ({ activeSlide }));
    emit(EVENTS.setActiveSlide, activeSlide);
  };

  renderAdmin = () => <Admin />;

  renderPresenterView = () => <PresenterView />;

  renderVideo = () => <ActiveSlideVideo src={this.state.activeSlide.video} />;
  renderImage = () => (
    <ActiveSlideImage
      zoom={this.state.activeSlideImageZoom}
      scale={this.state.activeSlide.imageScale}
      src={this.state.activeSlide.image}
    />
  );

  renderPresenter = () => (
    <Fragment>
      <SlidesContainer
        allSlidesComponent={AllSlides}
        containerComponent={MainContainer}
        hooks={this.applyHooks}
        onSlideChange={this.setActiveSlide}
        pager={ApplicationPager}
        slideComponent={Slide}
        slides={Slides}
        thumbnailComponent={Thumbnail}
      />
      {this.state.cameraVisible && <CameraHandler />}
      {this.state.textEditorVisible && <ApplicationTextEditor close={this.toggleTextEditor} />}
      {this.state.activeSlideImageVisible && this.state.activeSlide.image && this.renderImage()}
      {this.state.activeSlideImageVisible && this.state.activeSlide.video && this.renderVideo()}
      <KeyboardManager
        KeyC={this.toggleCamera}
        KeyE={this.toggleTextEditor}
        Space={this.toggleActiveSlideImage}
      />
    </Fragment>
  );

  render() {
    return (
      <Router>
        <Fragment>
          {this.state.bsod && <BSOD />}
          <Route exact path="/" component={this.renderPresenter} />
          <Route path="/admin" component={this.renderAdmin} />
          <Route path="/master" component={this.renderPresenterView} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
