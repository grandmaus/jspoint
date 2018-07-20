import React from 'react';
import { registerWebSocketSubscription } from '../utils/IO';
import styled from 'styled-components';
import EVENTS from '../utils/Events';
import slides from '../web-apis';

const IpHelper = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 22px;
  color: black;
  font-family: 'Dosis', sans-serif;
`;

const SlideImage = styled.img`
  height: 100px;
`;

const QrHelper = styled.img`
  position: fixed;
  right: 20px;
  bottom: 20px;
  height: 120px;
`;

const TouchPadContainer = styled.div`
  background-color: #f5f5f5;
  height: 100%;
  display: flex;
`;

const PresenterViewWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 35px;
  font-family: 'Dosis', sans-serif;
`;

const SlidesArea = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SlideSubArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  :first-child {
    border-bottom: 2px solid grey;
  }
`;

const SlideSubAreaHeader = styled.div`
  border-bottom: 1px solid lightgray;
  :first-child {
    background-color: lightcoral;
  }
  :last-child {
    background-color: #ffeb3b;
  }
`;

const SlideSubAreaContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SlideNote = styled.p`
  font-size: 20px;
`;

const ChatArea = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  border-left: 2px solid grey;
`;

const ChatQuestions = styled.ul`
  text-align: left;
  font-size: 16px;
  font-family: 'Dosis', sans-serif;
`;

const TouchPad = props => <TouchPadContainer {...props} />;

class PresenterView extends React.Component {
  state = {
    activeSlide: {},
    nextSlide: {},
    questions: []
  };
  setActiveSlide = activeSlide => {
    const currentSlideIndex = slides.findIndex(({ note }) => note === activeSlide.note);
    this.setState(() => ({
      activeSlide,
      nextSlide: slides[currentSlideIndex + 1]
    }));
  };

  addNewQuestion = question => {
    this.setState(state => ({
      questions: state.questions.concat(question)
    }));
  };

  componentWillMount() {
    registerWebSocketSubscription(EVENTS.setActiveSlide, this.setActiveSlide);
    registerWebSocketSubscription('chatbot_message', this.addNewQuestion);
    document.title = 'Presenter View';
  }

  renderQuestion = (question, index) => <li key={index}>{question}</li>;

  render() {
    return (
      <PresenterViewWrapper>
        <SlidesArea>
          <SlideSubArea>
            <SlideSubAreaHeader>Next slide</SlideSubAreaHeader>
            <SlideSubAreaContent>
              <SlideSubAreaContent>
                <p>{this.state.nextSlide.title}</p>
                <SlideNote>{this.state.nextSlide.note}</SlideNote>
                <SlideImage src={this.state.nextSlide.image} alt="" />
              </SlideSubAreaContent>
            </SlideSubAreaContent>
          </SlideSubArea>
          <SlideSubArea>
            <SlideSubAreaHeader>Current slide</SlideSubAreaHeader>
            <SlideSubAreaContent>
              <p>{this.state.activeSlide.title}</p>
              <SlideNote>{this.state.activeSlide.note}</SlideNote>
              <SlideImage src={this.state.activeSlide.image} alt="" />
            </SlideSubAreaContent>
          </SlideSubArea>
        </SlidesArea>
        <ChatArea>
          <ChatQuestions>{this.state.questions.map(this.renderQuestion)}</ChatQuestions>
        </ChatArea>
        <QrHelper src="qr.png" />
      </PresenterViewWrapper>
    );
  }
}

export default PresenterView;
