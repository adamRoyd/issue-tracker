import React from 'react';
import PropTypes from 'prop-types';
import {loadIssues} from '../../actions/issueActions';
import { Link, browserHistory } from 'react-router';
import { Dropdown, Button } from 'react-bootstrap';
import CustomMenu from './CustomMenu';

class ProjectPicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {visibleprojects : [],dropdownIsOpen : false};
        this.loadProjects = this.loadProjects.bind(this);
        this.searchProjects = this.searchProjects.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }
    loadProjects(){
        this.toggleDropdown();
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
    toggleDropdown(){
        this.setState({
            dropdownIsOpen : !this.state.dropdownIsOpen
        });
    }
    handleClick(value){
        const projectCode = value.toLowerCase();
        this.props.toggleDropdown();
        browserHistory.push(`/${projectCode}/issue/All/`);
        //TO DO load issues
    }
    render(){
        return(
            <Dropdown id="dropdown-custom-menu" open={this.state.dropdownIsOpen} onToggle={this.toggleDropdown}>
                <Button onClick={this.loadProjects} className="btn" bsRole="toggle">
                    Open Project
                </Button>
                <CustomMenu toggleDropdown={this.toggleDropdown} listValues={this.state.visibleprojects} searchProjects={this.searchProjects} bsRole="menu"/>
            </Dropdown> 
        );
    }
}

ProjectPicker.propTypes = {
    projects : PropTypes.array.isRequired
};

export default ProjectPicker;
                    