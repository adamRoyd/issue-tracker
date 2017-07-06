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

class NavBarPhone extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.newIssue = this.newIssue.bind(this);
    }
    logout = () => {
        this.props.dispatch(logout());
        browserHistory.push(`/`);
    }
    newIssue = () => {
        browserHistory.push('/abc123/new/1/100');
    }
    render(){
        let projectCode = this.props.params.projectCode;
        if(projectCode == null){projectCode = '';}
        return(
            <div id="navBar" className="row visible-phone">
                <div className="col-sm-2 projectCode">
                    <h4 className="white">{projectCode.toUpperCase()}</h4>
                </div>
                {(this.props.params.projectCode) ?
                    //nav bar for the main issue page
                    <ButtonGroup style={{ height: '100%' }}>
                        <Button onClick={() => this.handleClick('project')}>Open Project</Button>
                        <Button onClick={this.newIssue}>New Issue</Button>
                        <div className="float-right">
                            <DropdownButton title={this.props.username} id="bg-nested-dropdown">
                                <MenuItem eventKey="1">Create Project</MenuItem>    
                                <MenuItem eventKey="2" onSelect={this.adduser}>Manage Users</MenuItem>  
                                <MenuItem eventKey="3" onSelect={this.logout}>Log out</MenuItem>
                            </DropdownButton>
                        </div>
                    </ButtonGroup>     
                    :
                    //Nav bar for pages other than the main issue page
                    <ButtonGroup style={{ height: '100%' }}>
                        {(this.props.route == '/login' ) 
                            ?
                            <div className="float-left">
                                <Button onClick={browserHistory.goBack}>Back</Button>
                            </div>
                            :
                            null
                        }
                        <div className="float-right">
                            <DropdownButton title={this.props.username} id="bg-nested-dropdown">
                                <MenuItem eventKey="1">Create Project</MenuItem>    
                                <MenuItem eventKey="2" onSelect={this.adduser}>Manage Users</MenuItem>  
                                <MenuItem eventKey="3" onSelect={this.logout}>Log out</MenuItem>
                            </DropdownButton>
                        </div>
                    </ButtonGroup>  
                }
            </div>
            );
        }
    }

NavBarPhone.propTypes = {
    params : PropTypes.object.isRequired,
    username : PropTypes.string.isRequired
};


export default connect()(NavBarPhone);
