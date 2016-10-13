//default class minimizeChartData{
  var dataArray = [];

  //Vilken vecka det är
  Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
  };

  Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() är noll-baserad
    var dd  = this.getDate().toString();
    return yyyy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]); // padding
   };

  export function getLablesWeeks(data, week) {
    dataArray = [];//Tömmer den
    console.log('getLablesWeeks');
    let days = week*7;
    let last = new Date("1970-01-01");//First date
    let returnArray = [];
    for (var i = 0; i < data.length; i++) {
      if(last.getTime() < new Date(data[i].date).getTime()){
        console.log('är mer');
        last = new Date(data[i].date);//Lägger till en vecka
        last = new Date(last.setDate(last.getDate()+days));
        //setDate(now.getDate()+14
        returnArray.push(last.yyyymmdd());
        dataArray.push(data[i].count);
      }
    }
    console.log(returnArray.length);
    console.log(dataArray.length);
    return returnArray;//["2016-06-04", "2016-07-04", "2016-08-04", "2016-09-04"]
  }

  export function getDataArray() {
    console.log('getDataArrayWeeks');
    return dataArray;
  }
  export function yyyymmdd(date) {
    return date.yyyymmdd();
  }
