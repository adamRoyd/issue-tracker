import React, { PropTypes } from 'react';
import {loadIssues} from '../../actions/issueActions';
import { Link, browserHistory } from 'react-router';
import { Dropdown, Button } from 'react-bootstrap';
import CustomMenu from './CustomMenu';

class ProjectPicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {visibleprojects : []};
    }
    loadProjects(){
        this.setState({
            visibleprojects : this.props.projects
        });
    }
    searchProjects(e){
        let term = e.target.value.toUpperCase();
        this.setState({
            visibleprojects : this.props.projects.filter(project => project.includes(term))
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const projectCode = this.refs.projects.value.toLowerCase();
        browserHistory.push(`/${projectCode}/issue/All/`);
    }
    render(){
        this.loadProjects = this.loadProjects.bind(this);
        this.searchProjects = this.searchProjects.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        return(
            <Dropdown id="dropdown-custom-menu">
                <Button onClick={this.loadProjects} className="btn" bsRole="toggle">
                    Open Project
                </Button>
                <CustomMenu visibleprojects={this.state.visibleprojects} searchProjects={this.searchProjects} bsRole="menu"/>
            </Dropdown> 
        );
    }
}

ProjectPicker.propTypes = {
    projects : PropTypes.array.isRequired
};

export default ProjectPicker;
                    