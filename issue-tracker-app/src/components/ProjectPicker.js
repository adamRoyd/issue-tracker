import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadIssues} from '../actions/issueActions';
import { Link, browserHistory } from 'react-router';

class ProjectPicker extends React.Component{
    handleSubmit(e){
        e.preventDefault();
        const projectCode = this.refs.projects.value.toLowerCase();
        this.props.loadIssues();
        browserHistory.push(`/${projectCode}/issue/All/`);
    }
    render(){
        this.handleSubmit = this.handleSubmit.bind(this);
        return(
            <div>
                <h4>Hi {this.props.username},Select a project</h4>
                <form onSubmit={this.handleSubmit}>
                    <input ref="projects" type="text" list="projects"/>
                    {/*TO DO button only becomes active when input is a project*/}
                    <button type="submit">Confirm</button>
                </form>
                <datalist id="projects">
                    {this.props.projects.map((project, i) => {
                        return <option key={i} value={project}/>;
                    })}
                </datalist>
            </div>
        );
    }
}

ProjectPicker.propTypes = {
    projects : PropTypes.array.isRequired,
    loadIssues : PropTypes.func.isRequired
};

function mapStateToProps(state){
    return{
        username : state.user,
        projects : state.projects,
        issues : state.issues
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({loadIssues}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectPicker);