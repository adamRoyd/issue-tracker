import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { fetchProjects } from '../../actions/ProjectActions';
import { getProjects } from '../../reducers/ProjectReducer';
import ProjectPicker from '../Common/ProjectPicker';

class SelectProjectPage extends React.Component{
    componentDidMount() {
        this.props.dispatch(fetchProjects());
    }
    handleClick(value){
        const projectCode = value.toLowerCase();
        browserHistory.push(`/${projectCode}/issues/all`);
    }
    render(){
        return(
            <div className="wrapper">
                <div className="form-signin">
                    <h4>Select a project, {this.props.username}</h4>
                    <ProjectPicker {...this.props}/>
                </div>
            </div>
        );
    }  
}

SelectProjectPage.need = [() => { return fetchProjects();}];

function mapStateToProps(state){
    return{
        projects : getProjects(state)
    };
}



export default connect(mapStateToProps)(SelectProjectPage);