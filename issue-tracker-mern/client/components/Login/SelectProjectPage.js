import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { fetchProjects } from '../../actions/ProjectActions';
import { getProjects } from '../../reducers/ProjectReducer';
import { getUser } from '../../reducers/UserReducer';
import ProjectPicker from '../Common/ProjectPicker';

class SelectProjectPage extends React.Component{
    componentDidMount() {
        this.props.dispatch(fetchProjects());
        if(this.props.user.userproject){
            browserHistory.push(`/${this.props.user.userproject}/(:area)/all`);
        }
    }
    handleClick(value){
        const projectCode = value.toLowerCase();
        browserHistory.push(`/${projectCode}/(:area)/all`);
    }
    render(){
        return(
            <div className={styles.wrapper}>
                <div className={styles.formSignin}>
                    <h4>Select a project</h4>
                    <ProjectPicker {...this.props}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        projects : getProjects(state),
        user: getUser(state)
    };
}



export default connect(mapStateToProps)(SelectProjectPage);