var React = require("react");
var SchoolInfo = require("./SchoolInfo.jsx");
var AddSchool = require("./AddSchool.jsx");
var Login = require("./Login.jsx");

module.exports = React.createClass({
   render:function(){
       return(
           <div className="row">
           <Login />
             <div className="col-md-6">
                 <AddSchool />
             </div>
             <div className="col-md-6">
                 {
                     this.props.schools.map(function(s,index){
                         return(
                             <SchoolInfo info={s} key={"school"+index} />
                         )
                     })
                 }
             </div>
           </div>
       )
   }
});
