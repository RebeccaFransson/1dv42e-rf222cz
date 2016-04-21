
var React = require("react");
var ReactDOM = require("react-dom");
//var SchoolsList = require("./components/SchoolList.jsx");
//var SchoolStore = require("./stores/SchoolStore");
var Start = require("./components/Start.js");

/*
var _schools = SchoolStore.getSchools();
SchoolStore.onChange(function(schools){
    _schools = schools;
    render();
});
*/

function render(){
    //ReactDOM.render(<SchoolsList schools={_schools} />, document.getElementById("container"));
    ReactDOM.render( <Start />, document.getElementById("container"));
}

render();
