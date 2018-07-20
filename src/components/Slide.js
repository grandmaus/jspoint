import React, { Fragment } from 'react';
import styled from 'styled-components';
import Slide from '../generics/Slide';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { registerWebSocketSubscription } from '../utils/IO';
import EVENTS from '../utils/Events';

const SlideContainer = styled.div`
  flex: 1;
  display: ${props => (props.jumbotron ? 'flex' : 'initial')}
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
      text-align: ${props => (props.jumbotron ? 'center' : 'initial')}
  }
`;
const Title = styled.h1`
  font-family: 'Dosis', sans-serif;
  font-size: ${props => (props.emojiOnly ? 200 : 75)}px;
  padding: 0 50px;
  color: black;
  margin-bottom: 10px;
  min-height: 100px; //because emoji
  text-align: center;
`;

const Content = styled.article`
  display: flex;
  font-family: 'Nunito', sans-serif;
  text-align: center;
  font-size: 50px;
  padding: 0 50px;
  color: white;
  min-height: 72px; // because emoji
`;

const List = styled.ul`
  list-style-type: disc;
  font-size: 50px;
  font-family: 'Abel', sans-serif;
  color: white;
  margin: 50px;
`;

const ListItem = styled.li`
  padding: 0 35px;
`;

const JumbotronContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Jumbotron = props => {
  return (
    <JumbotronContainer>
      <Title emojiOnly={props.emojiOnly} className="jumbotron_main_title">
        {props.title}
      </Title>
      <Content>{props.content}</Content>
    </JumbotronContainer>
  );
};

const RegularSlide = props => {
  const visibleSlides = props.visibleActions();
  return (
    <SlideContainer>
      <Title>{props.slide.title}</Title>
      <Content>{props.slide.content}</Content>
      {props.slide.list && (
        <List>
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {visibleSlides.map((slide, index) => <ListItem key={index}>{slide}</ListItem>)}
          </ReactCSSTransitionGroup>
        </List>
      )}
    </SlideContainer>
  );
};

const SlideComponent = props => <Jumbotron {...props.slide} />;

const webSocketHooks = ({ next, previous }) => {
  registerWebSocketSubscription(EVENTS.next, next);
  registerWebSocketSubscription(EVENTS.previous, previous);
};

const ApplicationSlide = props => (
  <Slide hooks={webSocketHooks} slideComponent={SlideComponent} {...props} />
);

export default ApplicationSlide;
