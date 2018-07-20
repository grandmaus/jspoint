import React from "react";
import { func } from "prop-types";

class Pager extends React.Component {
  static propTypes = {
    pagerContainerComponent: func.isRequired,
    pageComponent: func.isRequired
  };

  renderPages = () => {
    const PagerContainer = this.props.pagerContainerComponent;
    return (
      <PagerContainer>
        {this.props.slides.map((slide, index) => this.renderPage(slide, index))}
      </PagerContainer>
    );
  };

  isSlideViewed = slide =>
    this.props.slides.findIndex(s => s === slide) < this.props.activeSlideIndex;

  isSlideActive = slide =>
    this.props.slides.findIndex(s => s === slide) ===
    this.props.activeSlideIndex;

  renderPage = (slide, index) => {
    const Page = this.props.pageComponent;
    return (
      <Page
        onClick={() => {
          this.props.onSlideSelect(slide);
        }}
        key={index}
        active={this.isSlideActive(slide)}
        viewed={this.isSlideViewed(slide)}
        title={slide.title}
        slide={slide}
      />
    );
  };
  render() {
    return this.renderPages();
  }
}

export default Pager;
