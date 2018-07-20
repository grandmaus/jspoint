import React from 'react';
import styled from 'styled-components';
import Spotlight from '../utils/Spotlight';

const SlideVideo = styled.iframe`
  border: 5px solid #292929f0;
  box-shadow: 2px 2px 6px 11px #353535;
`;

const ActiveSlideVideo = props => {
  const VideoSpotlight = () => (
    <SlideVideo
      width="1000"
      height="615"
      src={props.src}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  );
  return <Spotlight content={VideoSpotlight} />;
};

export default ActiveSlideVideo;
