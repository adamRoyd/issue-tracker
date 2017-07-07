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
    openProject = () => {
        browserHistory.push('/selectproject');
    }
    render(){
        let projectCode = this.props.params.projectCode;
        if(projectCode == null){projectCode = '';}
        return(
            <div id="navBar" className="row visible-phone">
                {(this.props.params.projectCode) ?
                    <ButtonGroup vertical block style={{ height: '100%'}}>
                            <DropdownButton title={this.props.username} id="bg-nested-dropdown">
                                <MenuItem eventKey="1" onSelect={this.newIssue}>New Issue</MenuItem>    
                                <MenuItem eventKey="2" onSelect={this.openProject}>Open Project</MenuItem>  
                                <MenuItem eventKey="3" onSelect={this.logout}>Log out</MenuItem>
                            </DropdownButton>
                    </ButtonGroup>     
                    :
                    <ButtonGroup vertical block style={{ height: '100%'}}>
                            <DropdownButton title={this.props.username} id="bg-nested-dropdown">
                                <MenuItem eventKey="3" onSelect={this.logout}>Log out</MenuItem>
                            </DropdownButton>
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
