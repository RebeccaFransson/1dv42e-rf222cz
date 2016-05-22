"use strict";
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Chart from 'chart.js';
import $ from 'jquery';

import actions from '../../redux/actions';



class StatisticsSlides extends React.Component{
  checkScroll(){
    var that = this;
    window.sr = ScrollReveal();
    //window.onscroll = function (e) {
      console.log(that.props.currentSlide);
      if(that.props.currentSlide.who == 'human'){
        that.props.dispatch(actions.toggleNext('human'));
        switch (that.props.currentSlide.slide) {
          case 1:
            createChart('mediaOverTime', that.props.statistics.mediaOverTime);

            $('html,body').animate({
                scrollTop: $("#mediaOverTime").offset().top},
                'slow');
            that.props.dispatch(actions.toggleNext('cpu'));
            break;
          case 2:
            createChart('followed_byOverTime', that.props.statistics.followed_byOverTime);

            $('html,body').animate({
                scrollTop: $("#followed_byOverTime").offset().top},
                'slow');
            that.props.dispatch(actions.toggleNext('cpu'));
            break;
          default:

        }
      }




      console.log(pageYOffset);
      /*if(pageYOffset == 200){
        console.log('check');
        createChart('mediaOverTime', that.props.statistics.mediaOverTime);
        sr.reveal('#mediaOverTime', { duration: 1500});
      }
      if(pageYOffset > 400 && pageYOffset < 500){
        console.log('check');
        createChart('followed_byOverTime', that.props.statistics.followed_byOverTime);
        sr.reveal('#followed_byOverTime', { duration: 1500});
      }*/
    //}
  }
  render(){
    this.checkScroll();
    return(
      <div class="col-md-12">
        <div class="col-md-12 info-square">
          <TopTwelveSlide topTwelve={this.props.statistics.topTwelve}/>
        </div>
        <div class="col-md-12 info-square">
          <canvas id="mediaOverTime" width="700" height="300" />
        </div>
        <div class="col-md-12 info-square">
          <canvas id="followed_byOverTime" width="700" height="300"/>
        </div>
      </div>
    );
    //<Followed_byOverTimeSlide followed_by={this.props.statistics.followed_byOverTime}/>
    //<MediaOverTimeSlide media={this.props.statistics.mediaOverTime}/>
  }
}
/*
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
        case 'Followed_byOverTimeSlide':
          return(
            <MediaOverTimeSlide active={isActive} key={index} media={that.props.statistics.mediaOverTime}/>
          );
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
*/
class TopTwelveSlide extends React.Component{
  render(){
    /*var classes = classNames({
      'slide': true,
      'slide--active': this.props.active
    }); className={classes}*/
    return(
      <div id="topTwelve">
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
    console.log(document.querySelector("#mediaOverTime"));
    /*var classes = classNames({
      'slide': true,
      'slide--active': this.props.active
    }); className={classes}*/
    if(this.props.media.length >= 1){
      createChart('mediaOverTime', this.props.media);
      return(
        <canvas>
        </canvas>
      );
    }else{
      return(
        <h1>No data collected</h1>
      )
    };
  };
};

class Followed_byOverTimeSlide extends React.Component{
  render(){
    /*var classes = classNames({
      'slide': true,
      'slide--active': this.props.active
    }); className={classes}*/
    if(this.props.followed_by.length >= 1){
      createChart('followed_byOverTime', this.props.followed_by);
      return(
        <div>
        <canvas id="followed_byOverTime" width="700" height="300"/>
        </div>
      );
    }else{
      return(
        <h1>No data collected</h1>
      )
    };
  };
};

function createChart(id, data){
  //TODO:soertera per år & månad okcså
  var ctx = document.getElementById(id);
  //sätt data och labels i arrayser
  var dataArray = [], labels = [];
  Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() är noll-baserad
    var dd  = this.getDate().toString();
    return yyyy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]); // padding
   };
  for (var i = 0; i < data.length; i++) {
    dataArray.push(data[i].count);
    labels.push(new Date(data[i].date).yyyymmdd());
  }

  if(ctx != null){
    var chartData ={
      labels: labels,
      datasets: [
          {
              label: '# number of media',
              fillColor: "rgba(255,221,134,0.49)",
              strokeColor: "rgba(239,116,59,0.49)",
              pointColor: "rgba(211,45,147,0.49)",
              pointStrokeColor: "rgba(239,116,59,0.49)",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: dataArray
          }
        ]
    }

    var hej = new Chart(ctx.getContext("2d")).Line(chartData);

  }
}
function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(StatisticsSlides);
