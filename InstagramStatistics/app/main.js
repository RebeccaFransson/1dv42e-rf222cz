import React from 'react';
import ReactDOM from 'react-dom';
//var SchoolsList = require("./components/SchoolList.jsx");
//var SchoolStore = require("./stores/SchoolStore");
//var Start = require("./components/Start.js");
import Start from './components/Start';
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
