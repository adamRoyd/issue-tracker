import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Dropdown, Button } from 'react-bootstrap';
import { getProjects } from '../../reducers/ProjectReducer';
import { fetchIssues } from '../../actions/IssueActions';
import CustomMenu from './CustomMenu';

class ProjectPicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {visibleprojects : [],dropdownIsOpen : false};
        this.loadProjects = this.loadProjects.bind(this);
        this.searchProjects = this.searchProjects.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    loadProjects(){
        this.toggleDropdown();
        this.setState({
            visibleprojects : this.props.projects
        });
    }
    searchProjects(e){
        let term = e.target.value.toLowerCase();
        this.setState({
            visibleprojects : this.props.projects.filter(project => project.projectCode.includes(term))
        });
    }
    toggleDropdown(){
        this.setState({
            dropdownIsOpen : !this.state.dropdownIsOpen
        });
    }
    handleClick(value){
        const projectCode = value.toLowerCase();
        this.props.dispatch(fetchIssues(projectCode));
        this.toggleDropdown();
        browserHistory.push(`/${projectCode}/issues/all/`);
    }
    render(){
        return(
            <Dropdown id="dropdown-custom-menu" open={this.state.dropdownIsOpen} onToggle={this.toggleDropdown}>
                <Button onClick={this.loadProjects} className="btn" bsRole="toggle">
                    Open Project
                </Button>
                <CustomMenu 
                    toggleDropdown={this.toggleDropdown}
                    listValues={this.state.visibleprojects}
                    searchProjects={this.searchProjects}
                    bsRole="menu"
                    handleClick={this.handleClick}
                />
            </Dropdown> 
        );
    }
}

ProjectPicker.propTypes = {
    projects : PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        projects: getProjects(state)
    };
}

export default connect(mapStateToProps)(ProjectPicker);
