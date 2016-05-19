"use strict";
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

class StatisticsSlides extends React.Component{
  render(){
    var that = this;
    var slidesNodes = this.props.slides.map(function (slideNode, index) {
      var isActive = that.props.currentSlide === index;
      switch (slideNode) {
        case 'TopTwelveSlide':
          return (
            <TopTwelveSlide active={isActive} key={index} topTwelve={that.props.statistics.topTwelve}/>
          );
          break;
        case 'MediaOverTimeSlide':
          return (
            <MediaOverTimeSlide active={isActive} key={index} />
          );
          break;
        default:
        return (
          <TopTwelveSlide active={isActive} key={slideNode.id} topTwelve={that.props.statistics.topTwelve}/>
        );

      }
    });
    return(
      <div>
        {slidesNodes}
      </div>
    );
  }
}

class TopTwelveSlide extends React.Component{
  render(){
    var classes = classNames({
      'slide': true,
      'slide--active': this.props.active
    });
    return(
      <div className={classes} id="topTwelve">
        {this.props.topTwelve.map(function(image, index){
          return (
              <li key={index} class="topTwelvePicture">
                <img src={image.url}/>
                <span class="fa fa-heart">{image.likes}</span>
              </li>
          )
        })}
      </div>
    );
  };
}

class MediaOverTimeSlide extends React.Component{
  render(){
    var classes = classNames({
      'slide': true,
      'slide--active': this.props.active
    });
    return(
      <div className={classes} id="mediaOverTime">
          <h1>hej</h1>
        </div>
    );
  };
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(StatisticsSlides);
