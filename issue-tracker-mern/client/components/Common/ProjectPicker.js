import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Dropdown, Button } from 'react-bootstrap';
import { getProjects } from '../../reducers/ProjectReducer';
import { fetchIssues } from '../../actions/IssueActions';

class ProjectPicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {visibleprojects : this.props.projects};
        this.searchProjects = this.searchProjects.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        this.nameInput.focus();
    }
    searchProjects(e){
        let term = e.target.value.toLowerCase();
        this.setState({
            visibleprojects : this.props.projects.filter(projectCode => projectCode.includes(term))
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
        browserHistory.push(`/${projectCode}/issues/all/`);
        if(this.props.close){
            this.props.close();
        }
    }
    render(){
        return(
            <div>
                <input
                ref={(input) => { this.nameInput = input; }}
                type="text"
                className="form-control"
                placeholder="Search projects..."
                onChange={this.searchProjects}
                />
                <div className="project-list">
                    <ul className="list-group">
                        {this.state.visibleprojects.map((projectCode, i) =>
                        <button 
                            type="button" 
                            className="list-group-item" 
                            key={i} 
                            onClick={() => this.handleClick(projectCode)}
                        >
                            {projectCode.toUpperCase()}
                        </button>
                        )}
                    </ul>
                </div>
            </div>
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
