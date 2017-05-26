import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { fetchProjects } from '../../actions/ProjectActions';
import { getProjects } from '../../reducers/ProjectReducer';

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
                    <h4>Select a project</h4>
                    <div className="project-list">
                        <ul className="list-group">
                           {this.props.projects.map((projectCode, i) =>
                                <button type="button" className="list-group-item" key={i} onClick={() => this.handleClick(projectCode)}>{projectCode}</button>
                            )}
                        </ul>
                    </div>
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