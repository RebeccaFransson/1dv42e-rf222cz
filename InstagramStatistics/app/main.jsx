var React = require("react");
var ReactDOM = require("react-dom");
var SchoolsList = require("./components/SchoolList.jsx");
var schoolsStore = require("./stores/SchoolStore");

var _schools = schoolsStore.getSchools();
schoolsStore.onChange(function(schools){
    _schools = schools;
    render();
});

function render(){
    ReactDOM.render(<SchoolsList schools={_schools} />, document.getElementById("container"));
}

render();
