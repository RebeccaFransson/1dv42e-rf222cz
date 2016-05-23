"use strict";
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Chart from 'chart.js';
import $ from 'jquery';

import actions from '../../redux/actions';



class StatisticsSlides extends React.Component{
  componentDidMount(){
    var that = this;
    window.sr = ScrollReveal();

sr.reveal('#mediaOverTime', { duration: 1000,  origin: 'bottom', distance    : '500px' });
createChart('mediaOverTimeCanvas', that.props.statistics.mediaOverTime);

sr.reveal('#followsOverTime', { duration: 1000,  origin: 'bottom', distance    : '500px'});
createChart('followed_byOverTimeCanvas', that.props.statistics.followed_byOverTime);
sr.reveal('#followed_byOverTime', { duration: 1000,  origin: 'bottom', distance    : '500px'});
createChart('followsOverTimeCanvas', that.props.statistics.followsOverTime);
    $(window).scroll(function() {
      switch (that.props.currentSlide) {
        case 0:
          if(that.checkScrollElement('#mediaOverTime', this)){
            sr.reveal('#mediaOverTime', { duration: 1000,  origin: 'bottom', distance    : '500px' });
            //createChart('mediaOverTimeCanvas', that.props.statistics.mediaOverTime);
            that.props.dispatch(actions.toggleNext());
          }
          break;
        case 1:
          if(that.checkScrollElement('#followed_byOverTime', this)){
            //createChart('followed_byOverTimeCanvas', that.props.statistics.followed_byOverTime);
            that.props.dispatch(actions.toggleNext());
            //sr.reveal('#followed_byOverTime', { duration: 1000});
          }
          break;
        case 2:
          if(that.checkScrollElement('#followsOverTime', this)){
            //createChart('followsOverTimeCanvas', that.props.statistics.followsOverTime);
            that.props.dispatch(actions.toggleNext());
            //sr.reveal('#followsOverTime', { duration: 1000});
          }
          break;
        default:
        //TODO: sista caset byt rikting på pilen för att ta upp användaren
      }

    });
  }

  checkScrollElement(id, that){
    var hT = $(id).offset().top - 200,
       hH = $(id).outerHeight(),
       wH = $(window).height(),
       wS = $(that).scrollTop();
    return wS > (hT+hH-wH);
  }

  toggleNext() {
    this.props.dispatch(actions.toggleNext());
  }

  render(){
    var arrow;
    console.log(this.props.currentSlide);
    if (this.props.currentSlide == 3) {
        arrow = <span class="fa fa-arrow-circle-up" onClick={this.toggleNext.bind(this)}/>;
    } else {
        arrow = <span class="fa fa-arrow-circle-down" onClick={this.toggleNext.bind(this)}/>;
    }
    console.log(arrow);
    return(
      <div class="col-md-12">
        <div class="col-md-3"></div>

          <div class="col-md-6">
            <div class="col-md-12">
              <div class="col-md-12 info-square">
                <TopTwelveSlide topTwelve={this.props.statistics.topTwelve}/>
              </div>
              <div class="col-md-12 info-square" id="mediaOverTime">
                <canvas id="mediaOverTimeCanvas" width="700" height="300" />
              </div>
              <div class="col-md-12 info-square" id="followed_byOverTime">
                <canvas id="followed_byOverTimeCanvas" width="700" height="300"/>
              </div>
              <div class="col-md-12 info-square" id="followsOverTime">
                <canvas id="followsOverTimeCanvas" width="700" height="300"/>
              </div>
            </div>
          </div>

        <div class="col-md-3">{arrow}</div>
      </div>
    );
  }
}

class TopTwelveSlide extends React.Component{
  render(){
    return(
      <div id="topTwelve">
        {this.props.topTwelve.map(function(image, index){
          return (
              <li key={index} class="topThreePicture">
                <img src={image.url}/>
                <span class="fa fa-heart">{image.likes}</span>
              </li>
          )
        })}
      </div>
    );
  };
}

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
