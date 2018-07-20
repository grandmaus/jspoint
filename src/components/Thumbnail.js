import React from "react";
import styled from "styled-components";

const ThumbnailContainer = styled.div`
  font-family: "Dosis", sans-serif;
  color: white;
  background-color: ${props => (props.active ? "#3a3a3a" : "#999999")};
  border: ${props => (props.active ? "5px solid black" : "5px solid transparent")};
  
  padding: 15px;
  font-size: 42px;
  text-align: center;
  margin: 15px;
  cursor: pointer;
`;

const ThumbnailTitle = styled.div``;

class Thumbnail extends React.PureComponent {
  render() {
    return (
      <ThumbnailContainer  active={this.props.active}>
       <ThumbnailTitle>{this.props.slide.title}</ThumbnailTitle>
      </ThumbnailContainer>
    );
  }
}

export default Thumbnail;
