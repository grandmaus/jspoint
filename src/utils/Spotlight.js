import React from 'react';
import styled from 'styled-components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const SpotlightContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spotlight = props => {
  const Content = props.content;
  return (
    <SpotlightContainer>
      <Content />
    </SpotlightContainer>
  );
};

export default Spotlight;
