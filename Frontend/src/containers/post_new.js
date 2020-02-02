import React,{Component,PropTypes} from "react";
import {Field,reduxForm} from "redux-form";
import {connect} from "react-redux";
import {createPost} from "../actions/index";
import {Link} from "react-router-dom";



//redux form almost similar to connect 1st parameter is form object 2nd is mapStateToProps 3rd is mapDispatchToProps.
//we will use shorthand of mapDispatchToProps ,We could have written mapDispatchToProps function and then use bindActionCreators to map dispatch to props .but instead of doing all that we just pass the function as argument in reduxForm. 
function mapStateToProps(state){
	return {
		newpost:state.newpost,
	}
}

export default connect(mapStateToProps, {createPost})(reduxForm({
	form:'PostForm',
	fields:['title','content'],
})(PostNew));