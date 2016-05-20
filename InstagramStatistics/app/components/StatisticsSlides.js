"use strict";
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
var LineChart = require("react-chartjs").Line;
import Chart from 'chart.js'

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
            <MediaOverTimeSlide active={isActive} key={index} media={that.props.statistics.mediaOverTime}/>
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
  var chartData = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3]
        }]
    };
    var chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }

    var classes = classNames({
      'slide': true,
      'slide--active': this.props.active
    });
    if(this.props.media.length >= 1){
      //this.hejsan();
      //<LineChart data={chartData} options={chartOptions} width="700" height="300"/>
      //<canvas className={classes} id="mediaOverTime" ></canvas>
      return(
        <div>
        <LineChart data={chartData} options={chartOptions} width="400" height="400"/>

        </div>
      );
    }else{
      return(
        <h1>No data collected</h1>
      )
    }

  };
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(StatisticsSlides);
