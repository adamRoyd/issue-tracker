import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { toggleArea } from '../../actions/AreaActions';
import { logout } from '../../actions/UserActions';
import ProjectPicker from './ProjectPicker';
import NewIssueModal from '../Modals/NewIssueModal';
import BatchIssuesModal from '../Modals/BatchIssuesModal';
import OpenProjectModal from '../Modals/OpenProjectModal';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.areaClick = this.areaClick.bind(this);
    }
    logout = () => {
        this.props.dispatch(logout());
        //browserHistory.push(`/`);
    }
    areaClick = () => {
        browserHistory.push(`/${this.props.params.projectCode}/issues/all`);
        this.props.dispatch(toggleArea());
    }
    render(){
        let projectCode = this.props.params.projectCode;
        if(projectCode == null){projectCode = '';}
        return(
            <div id="navBar" className="row">
                <Link to={`/${projectCode}/issues/all`}>
                    <div className="col-sm-2 projectCode">
                        <h4 className="white">{projectCode.toUpperCase()}</h4>
                    </div>
                </Link>
                <div className="float-left">
                <DropdownButton  title={(this.props.area == 'internal') ? 'Internal area' : 'Client area' } id="bg-nested-dropdown" className="nav-div left">
                    <MenuItem onSelect={this.areaClick} eventKey="1">{(this.props.area == 'internal') ? 'Switch to Client area' : 'Switch to Internal area' }</MenuItem>    
                </DropdownButton>
                </div>
                <OpenProjectModal
                    buttonName="Open Project"
                    {...this.props}
                    />
                {(projectCode == '')
                    ? <div></div>
                    : <NewIssueModal
                        buttonName="New issue"
                        {...this.props}/>
                }
                {(this.props.batchIssues.length > 0)
                    ? <BatchIssuesModal
                        buttonName="Batch issues"
                        {...this.props}/>
                    : null
                }
                <div className="float-right">
                <DropdownButton title={this.props.username} id="bg-nested-dropdown" className="nav-div right">
                    <MenuItem eventKey="1">Create Project</MenuItem>    
                    <MenuItem eventKey="2">Manage Users</MenuItem>  
                    <MenuItem eventKey="3" onSelect={this.logout}>Log out</MenuItem>
                </DropdownButton>      
                </div>
            </div>
            );
        }
    }

NavBar.propTypes = {
    params : PropTypes.object.isRequired,
    username : PropTypes.string.isRequired
};


export default connect()(NavBar);
