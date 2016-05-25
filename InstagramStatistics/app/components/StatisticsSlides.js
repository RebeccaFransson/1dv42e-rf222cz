"use strict";
import React from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import $ from 'jquery';

import actions from '../../redux/actions';

class StatisticsSlides extends React.Component{
  componentDidMount(){
    var isPinned = false;

    //Visa data när användaren scrollar ned
    sr.reveal('#topThree', { duration: 1000,  origin: 'bottom', distance    : '500px' });

    let colors = {fill: 'rgba(255,221,134,0.2)', stroke: 'rgba(239,116,59,0.49)', point: 'rgba(211,45,147,0.49)'}
    sr.reveal('#mediaOverTime', { duration: 1000,  origin: 'bottom', distance    : '500px' });
    createChart('mediaOverTimeCanvas', this.props.statistics.mediaOverTime, colors);

    colors = {fill: 'rgba(239,116,59,0.2)', stroke: 'rgba(211,45,147,0.49)', point: 'rgba(255,221,134,0.49)'}
    sr.reveal('#followsOverTime', { duration: 1000,  origin: 'bottom', distance    : '500px'});
    createChart('followed_byOverTimeCanvas', this.props.statistics.followed_byOverTime, colors);

    colors = {fill: 'rgba(211,45,147,0.2)', stroke: 'rgba(255,221,134,0.49)', point: 'rgba(239,116,59,0.49)'}
    sr.reveal('#followed_byOverTime', { duration: 1000,  origin: 'bottom', distance    : '500px'});
    createChart('followsOverTimeCanvas', this.props.statistics.followsOverTime, colors);

    var that = this;
    $(window).scroll(function() {
      //kolla om vi ska sätta fast profilen
      var outerHeight = $('.loggedin-top').outerHeight(true);
      if($(window).scrollTop() >= outerHeight){
        if(!$('.profile').hasClass('pinned')){
            $('.profile').addClass('pinned');
        }
      }else{
        $('.profile').removeClass('pinned');
      }

      //Om currentSlide inte är den första än, kolla om användaren är längt upp på sidan och sätt currentSlide t den första
      if(that.props.currentSlide != that.getSlides()[0]){
        if($(document).scrollTop() < $(window).height()){
          console.log('sätt t första sliden');
          that.props.dispatch(actions.toggleNext(that.getSlides()[0]));
        }
      }
      //Om användaren ser den sista sliden sätt currentSlide till den sista för att visa knapp med pil-uppåt
      if(that.checkScrollElement('#followed_byOverTime', this)){
        console.log('sätter den till den sista');
        if(that.props.currentSlide != that.getSlides()[that.getSlides().length-1]){
          that.props.dispatch(actions.toggleNext(that.getSlides()[that.getSlides().length-1]));
        }
      }

/*console.log('längst upp: ', that.props.currentSlide);
      switch (that.props.currentSlide) {
        case 'mediaOverTime':
          if(that.checkScrollElement('#mediaOverTime', this)){
            that.props.dispatch(actions.toggleNext(that.getSlides()));
          }
          break;
        case 'followsOverTime':
          if(that.checkScrollElement('#followsOverTime', this)){
            that.props.dispatch(actions.toggleNext(that.getSlides()));
          }
          break;
        case 'followed_byOverTime':
          if(that.checkScrollElement('#followed_byOverTime', this)){
            //that.props.dispatch(actions.toggleNext('end'));
          }
          break;
        case 'end':
          console.log('slut');
          break;
        default:
        //TODO: sista caset byt rikting på pilen för att ta upp användaren
      }*/

    });
  }
  getSlides(){
    return ['mediaOverTime', 'followsOverTime', 'followed_byOverTime']; //Viktigt att det är i samma ordning som slidens visas, se rad 18-30
  }
  checkScrollElement(id, that){
    var hT = $(id).offset().top,
       hH = $(id).outerHeight(),
       wH = $(window).height(),
       wS = $(that).scrollTop();
    return wS > (hT+hH-wH);
  }

  toggleNext() {
    console.log('ett tryck!!!');
    console.log(this.props.dispatch(actions.toggleNext(this.getSlides())));
    console.log(this.props.currentSlide);
  }
  backToStart(){
    $('html, body').animate({
            scrollTop: 0
        }, 800);
  }

  render(){
    var arrow;
    //console.log($(document).scrollTop());
    if (this.props.currentSlide == this.getSlides()[this.getSlides().length-1]) {
        arrow = <span class="fa fa-arrow-circle-up" onClick={this.backToStart.bind(this)}/>;
    } else {
        //arrow = <span class="fa fa-arrow-circle-down" onClick={this.toggleNext.bind(this)}/>;
        arrow = <span class="fa fa-arrow-circle-down"></span>;
    }

    return(
      <div class="col-md-12 loggedin-bottom">
          <Profile profile={this.props.user.profile}/>

          <div class="col-md-6">
            <div class="col-md-12">
              <div class="col-md-12 info-square" id="topThree">
                <TopThreeSlide topTwelve={this.props.statistics.topTwelve}/>
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

class TopThreeSlide extends React.Component{
  render(){
    return(
      <div id="topTwelve">
        {this.props.topTwelve.map(function(image, index){
          return (
              <li key={index} class="topThreePicture">
              <span class="number">{index+1}.</span>
                <img src={image.url}/>
                <span class="fa fa-heart">{image.likes}</span>
              </li>
          )
        })}
      </div>
    );
  };
}

class Profile extends React.Component{
  componentDidMount(){
    window.sr = ScrollReveal();
    sr.reveal('.profile', { duration: 1000,  origin: 'top', distance    : '500px' });
  }
  render(){
    //console.log(this.props.profile);
    return(
      <div class="col-md-3 ">
      <div class="col-md-12 profile">
        <div class="col-md-3"><img src={this.props.profile.picture} height="100" width="120"/></div>
        <div class="col-md-9 nickname">{this.props.profile.nickname}</div>
        <div class="col-md-12 bio"><span>{this.props.profile.name}</span>  {this.props.profile.bio}</div>
        <div class="col-md-3 bio"><span>{this.props.profile.counts.media}</span> posts</div>
        <div class="col-md-5 bio"><span>{this.props.profile.counts.followed_by}</span> followers</div>
        <div class="col-md-4 bio"><span>{this.props.profile.counts.follows}</span> follows</div>
      </div>

      </div>
    );
  };
}

function createChart(id, data, colors){
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
              label: "My First dataset",
              fillColor: colors.fill,
              strokeColor: colors.stroke,
              pointColor: colors.point,
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
