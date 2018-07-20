import React from 'react';
import { emit, registerWebSocketSubscription } from '../utils/IO';
import styled from 'styled-components';
import TouchControl from '../utils/TouchControl';
import vibrate from '../utils/Vibration';
import EVENTS from '../utils/Events';
import Slide from '../generics/Slide';

import FontAwesome from 'react-fontawesome';

const ButtonContainer = styled.div`
  display: flex;
`;

const ControlButton = styled.button`
  background-color: ${props => props.background};
  flex: 1;
  border: none;
  font-size: 25px;
  padding: 25px;
`;

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TouchPadContainer = styled.div`
  background-color: #f5f5f5;
  height: 100%;
  display: flex;
`;

const TouchPad = props => <TouchPadContainer {...props} />;

class Admin extends React.Component {
  state = { activeSlide: {} };
  setActiveSlide = activeSlide => {
    console.log('setting active slide for admin', activeSlide);
    this.setState(() => ({
      activeSlide
    }));
  };
  componentWillMount() {
    registerWebSocketSubscription(EVENTS.setActiveSlide, this.setActiveSlide);
  }
  emitPrevious() {
    emit(EVENTS.previous);
  }
  emitNext() {
    emit(EVENTS.next);
  }
  toggleCamera() {
    emit(EVENTS.toggleCamera);
  }
  toggleActiveImage() {
    emit(EVENTS.togglePicture);
  }
  toggleEditor() {
    emit(EVENTS.toggleEditor);
  }
  toggleAllSlides() {
    emit(EVENTS.toggleAllSlides);
  }
  activePictureZoomIn() {
    emit(EVENTS.activePictureZoomIn);
  }
  activePictureZoomOut() {
    emit(EVENTS.activePictureZoomOut);
  }

  emitBSOD() {
    emit('NUKE');
  }

  vibrateOnSwipe() {
    vibrate(200);
  }

  renderTouchPad = () => (
    <TouchControl
      onSwipeLeft={this.emitPrevious}
      onSwipeRight={this.emitNext}
      renderTo={TouchPad}
    />
  );

  renderSlideComponent = ({ slide }) => {
    return (
      <div>
        <h2>{slide.title}</h2>
        {slide.list && slide.list.map((item, index) => <li key={index}>{item}</li>)}
      </div>
    );
  };

  renderActiveSlide = props => (
    <Slide slide={this.state.activeSlide} slideComponent={this.renderSlideComponent} {...props} />
  );

  renderActivePictureControl = () => (
    <div>
      <button style={{ fontSize: '22px', padding: '15px' }} onClick={this.activePictureZoomIn}>
        increase
      </button>
      <button style={{ fontSize: '22px', padding: '15px' }} onClick={this.activePictureZoomOut}>
        decrease
      </button>
    </div>
  );

  renderButtons = () => (
    <ButtonContainer>
      <ControlButton background="#50514F" onClick={this.emitBSOD}>
        Show BSOD
      </ControlButton>
    </ButtonContainer>
  );

  renderControls = () => (
    <Container>
      {this.renderActiveSlide()}
      {this.renderTouchPad()}
      {this.renderActivePictureControl()}
      {this.renderButtons()}
    </Container>
  );

  render() {
    return this.renderControls();
  }
}

export default Admin;
