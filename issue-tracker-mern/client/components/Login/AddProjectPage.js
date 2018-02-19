import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProjectRequest } from '../../actions/ProjectActions';
import { getMessage } from '../../reducers/MessageReducer';
import { Link, browserHistory } from 'react-router';
import TextInput from '../Common/TextInput';

class AddProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            project: "",
            message: "",
            success: false
        };
        this.updateProjectState = this.updateProjectState.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    updateProjectState(event) {
        const field = event.target.name;
        let project = this.state.project;
        project = event.target.value;
        return this.setState({ project: project });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const newProject = this.state.project;
        const errors = this.validate(newProject);
        if (Object.keys(errors).length === 0 && errors.constructor === Object) {
            this.props.dispatch(addProjectRequest(newProject));
            return this.setState({
                message: `New project ${newProject} created.`,
                project: "",
                success: true
            })
        } else {
            return this.setState({
                message: `There was a problem with the form. Please ensure you have entered a valid project code.`,
                success: false
            })
        }
    }
    validate(project) {
        let errors = {}
        if (project == "") {
            errors = Object.assign({}, errors, {
                project: 'Error'
            })
        }
        return errors
    }
    render() {
        return (
            <div className="col-sm-8 col-sm-offset-2">
                <h4>Add a new project</h4>
                <TextInput
                    name="project"
                    label="Project code"
                    placeholder="Enter a project code"
                    value={this.state.project}
                    onChange={this.updateProjectState} />
                <div className={this.props.message.success ? "infomessage success" : "infomessage error"}>{this.props.message.text}</div>
                <div className="right-align">
                    <button className="btn" onClick={this.handleSubmit}>Create Project</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: getMessage(state)
    };
}

export default connect(mapStateToProps)(AddProjectPage);