"use strict";
import React from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import $ from 'jquery';
import ScrollReveal from 'scrollreveal';

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
          that.props.dispatch(actions.toggleNext(that.getSlides()[0]));
        }
      }
      //Om current är den sista sliden sätt till den första
      if(that.checkScrollElement('#topThree', this)){
        if(that.props.currentSlide == that.getSlides()[that.getSlides().length-1]){//sista sliden
          that.props.dispatch(actions.toggleNext(that.getSlides()[0]));
        }
      }
      //Kollar om nästa data syns för användaren sätter så fall sätter ste till nästa slide
      if(that.checkScrollElement('#mediaOverTime', this)){
        if(that.props.currentSlide == that.getSlides()[0]){//första sliden
          that.props.dispatch(actions.toggleNext(that.getSlides()));
        }
      }
      if(that.checkScrollElement('#followed_byOverTime', this)){
        if(that.props.currentSlide == 'mediaOverTime'){
          that.props.dispatch(actions.toggleNext(that.getSlides()));
        }
      }
      if(that.props.currentSlide != 'end'){
        //Om användaren ser den sista sliden sätt currentSlide till den sista för att visa knapp med pil-uppåt
        if(that.checkScrollElement('#followsOverTime', this)){
          if(that.props.currentSlide == 'followed_byOverTime'){
            that.props.dispatch(actions.toggleNext('end'));
          }
        }
      }
    });
  }
  getSlides(){
    //Lätt att ändra, men måste vara i samma ordning som if-saterna under rad 47-71
    return ['topThree', 'mediaOverTime', 'followed_byOverTime', 'followsOverTime'];
  }

  checkScrollElement(id, that){
    //Kollar om användaren ser ett visst element
    var hT = $(id).offset().top,
       hH = $(id).outerHeight(),
       wH = $(window).height(),
       wS = $(that).scrollTop();
    return wS > (hT+hH-wH);
  }

  toggleNext() {
    //Hämtar höjden från top-rubriken och var elementet vi ska scrolla till är placerat
    //Scrollar sedan till det elementet som är nästa i slidsen
    this.props.dispatch(actions.toggleNext(this.getSlides()));
    var elementTop = $('#'+this.props.currentSlide).offset().top,
       top = $('.loggedin-top').outerHeight();
    $('html, body').animate({
            scrollTop: elementTop+top
        }, 800);
  }
  backToStart(){
    //Scrolalr uppåt, scrollen tar 800 millisek. Efter 800 milisek byter vitill den första sliden i state
    //En timeout har satts för att scrollen tar 800 ms och om vi sätter staten till första sliden utan timeouten
    // kommer det bli en konflikt med det som är i funtionen componentDidMount när ststen ändras när användaren scrolalr själv
    $('html, body').animate({
            scrollTop: 0
        }, 800);
        var that = this;
    setTimeout(function(){
       that.props.dispatch(actions.toggleNext(that.getSlides()[0]));
    }, 801);
  }

  render(){
    var arrow;
    console.log(this.getSlides()[this.getSlides().length-2]);
    if(this.props.currentSlide == 'end') {
        arrow = <span class="fa fa-arrow-circle-up" onClick={this.backToStart.bind(this)}/>;
    }else{
        arrow = <span class="fa fa-arrow-circle-down" onClick={this.toggleNext.bind(this)}/>;
        //arrow = <span class="fa fa-arrow-circle-down"></span>;
    }

    return(
      <div class="col-md-12 loggedin-bottom">
          <Profile profile={this.props.user.profile}/>

          <div class="col-md-6">
            <div class="col-md-12">
              <TopThreeSlide topThree={this.props.statistics.topThree}/>
              <div class="col-md-12 info-square" id="mediaOverTime">
                <p>Posts</p>
                <canvas id="mediaOverTimeCanvas" width="700" height="300" />
              </div>
              <div class="col-md-12 info-square" id="followed_byOverTime">
                <p>Followers</p>
                <canvas id="followed_byOverTimeCanvas" width="700" height="300"/>
              </div>
              <div class="col-md-12 info-square" id="followsOverTime">
                <p>Follows</p>
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
      <div class="col-md-12 info-square" id="topThree">
        {this.props.topThree.map(function(image, index){
          return (
              <li key={index} class="topThreePicture">
              <span class="number">{index+1}.</span>
                <img src={image.url}/>
                <span class="fa fa-heart">{image.likes}</span>
              </li>
          )
        })}
        <p>Top pictures for your last 20 posts.</p>
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
              responsive: true,
              data: dataArray
          }
        ]
    }
    new Chart(ctx.getContext("2d")).Line(chartData);
  }
}

//Gör så att classen StatisticsSlides kommer åt allt i staten utan att få det från sin föräldrer.
function mapStateToProps(state){
  return state;
}
export default connect(mapStateToProps)(StatisticsSlides);
