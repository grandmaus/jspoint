import React from "react";
import styled from "styled-components";
import Pager from "../generics/Pager";

const getDotColor = props => {
  if (props.viewed) return "#464547";
  if (props.active) {
    return "#FFFFFF";
  } else return " #666666";
};

const PageDot = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: ${props => getDotColor(props)};
  opacity: ${props => (props.viewed ? 0.4 : 1)};
  margin: 0 5px;
  border: 4px solid #f5f5f52b;
  transition: all 0.5s ease;
`;

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

class ApplicationPager extends React.PureComponent {
  render() {
    return (
      <Pager
        pagerContainerComponent={PageContainer}
        pageComponent={PageDot}
        {...this.props}
      />
    );
  }
}

export default ApplicationPager;
