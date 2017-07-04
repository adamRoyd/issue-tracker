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
import { openModal } from '../../actions/ModalActions'
import { DropdownButton, MenuItem, ButtonGroup, Button } from 'react-bootstrap';

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.areaClick = this.areaClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    logout = () => {
        this.props.dispatch(logout());
        browserHistory.push(`/`);
    }
    areaClick = () => {
        browserHistory.push(`/${this.props.params.projectCode}/issues/all`);
        this.props.dispatch(toggleArea());
    }
    handleClick = (value) => {
        this.props.dispatch(openModal(value));
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
                <ButtonGroup style={{ height: '100%' }}>
                    <DropdownButton  title={(this.props.area == 'internal') ? 'Internal area' : 'Client area' } id="bg-nested-dropdown" className="nav-div left">
                        <MenuItem onSelect={this.areaClick} eventKey="1">{(this.props.area == 'internal') ? 'Switch to Client area' : 'Switch to Internal area' }</MenuItem>
                    </DropdownButton>
                    <Button onClick={() => this.handleClick('project')}>Open Project</Button>
                    <Button onClick={() => this.handleClick('newIssue')}>New Issue</Button>
                    {(this.props.batchIssues.length > 0)
                        ? <Button onClick={() => this.handleClick('batch')}>Batch Issue</Button>
                        : null
                    }
                    <div className="float-right">
                        <DropdownButton title={this.props.username} id="bg-nested-dropdown">
                            <MenuItem eventKey="1">Create Project</MenuItem>    
                            <MenuItem eventKey="2">Manage Users</MenuItem>  
                            <MenuItem eventKey="3" onSelect={this.logout}>Log out</MenuItem>
                        </DropdownButton>
                    </div>
                    <OpenProjectModal {...this.props}/>
                    <NewIssueModal {...this.props}/>
                    <BatchIssuesModal {...this.props}/>
                </ButtonGroup>        
            </div>
            );
        }
    }

NavBar.propTypes = {
    params : PropTypes.object.isRequired,
    username : PropTypes.string.isRequired
};


export default connect()(NavBar);
