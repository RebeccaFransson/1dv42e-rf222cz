import React from 'react';
import ReactDOM from 'react-dom';
//var SchoolsList = require("./components/SchoolList.jsx");
//var SchoolStore = require("./stores/SchoolStore");
//var Start = require("./components/Start.js");
import Start from './components/Start';

import About from './components/About';
/*
var _schools = SchoolStore.getSchools();
SchoolStore.onChange(function(schools){
    _schools = schools;
    render();
});
*/

function render(){
    ReactDOM.render(<About />, document.getElementById("navigation"));
    ReactDOM.render( <Start />, document.getElementById("container"));
}

render();
