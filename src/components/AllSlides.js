import React from "react";
import styled from "styled-components";
import Pager from "../generics/Pager";
import Thumbnail from "./Thumbnail";

const AllSlidesContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  background: #2b2b2b;
  flex-direction: column;
  overflow-y: auto;
`;

class AllSlides extends React.Component {
  render() {
    return (
      <Pager
        pagerContainerComponent={AllSlidesContainer}
        pageComponent={Thumbnail}
        {...this.props}
      />
    );
  }
}

export default AllSlides;
