import React from 'react';
import styled from 'styled-components';
import Spotlight from '../utils/Spotlight';

const SlideImage = styled.img`
  max-width: 768px;
  transition: transform 0.7s ease;
  transform: scale(${props => props.scale});
`;

const ActiveSlideImage = props => {
  const ImageSpotlight = () => <SlideImage {...props} />;
  return <Spotlight content={ImageSpotlight} />;
};

ActiveSlideImage.defaultProps = {
  scale: 1
};

export default ActiveSlideImage;
