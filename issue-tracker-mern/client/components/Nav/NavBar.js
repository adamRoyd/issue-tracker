import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { toggleArea } from '../../actions/AreaActions';
import { logout, logoutUser } from '../../actions/UserActions';
import { fetchIssuesByUser } from '../../actions/IssueActions';
import ProjectPicker from '../Common/ProjectPicker';
import NewIssueModal from '../Modals/NewIssueModal';
import BatchIssuesModal from '../Modals/BatchIssuesModal';
import OpenProjectModal from '../Modals/OpenProjectModal';
import AddProjectModal from '../Modals/AddProjectModal';
import AddUserModal from '../Modals/AddUserModal';
import { openModal } from '../../actions/ModalActions'
import { DropdownButton, MenuItem, ButtonGroup, Button } from 'react-bootstrap';

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.areaClick = this.areaClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.homeClick = this.homeClick.bind(this);
        this.myIssues = this.myIssues.bind(this);
    }
    logout = () => {
        this.props.dispatch(logoutUser());
        this.props.dispatch(logout());
        browserHistory.push(`/`);
    }
    areaClick = () => {
        this.props.dispatch(toggleArea());
        {(this.props.area == 'internal')
            ? browserHistory.push(`/${this.props.params.projectCode}/client/all`)
            : browserHistory.push(`/${this.props.params.projectCode}/internal/all`)
        }
    }
    myIssues = () => {
        this.props.dispatch(fetchIssuesByUser(this.props.user.username));
        browserHistory.push('/myissues');
    }
    homeClick = () => {
        browserHistory.push(`/${this.props.params.projectCode}/${this.props.area}/all`);
    }
    handleClick = (value) => {
        this.props.dispatch(openModal(value));
    }
    render(){
        const usertype = this.props.user.usertype;
        const isInternal = (this.props.user.usertype == 'Admin' || this.props.user.usertype == 'Internal');
        let projectCode = this.props.params.projectCode;
        if(projectCode == null){projectCode = '';}
        return(
            <div id="navBar" className={'row visible-desktop navBar'}>
                {(this.props.params.projectCode) ?
                    //nav bar for the main issue page
                    <ButtonGroup style={{ height: '100%'}}>
                        <Button className='navBtn' onClick={this.homeClick}>{projectCode.toUpperCase()}</Button>
                        {(usertype == 'Client')
                            ?   <Button className='navBtn' disabled={true}>Client Area</Button>
                            :   <DropdownButton
                                    id="bg-nested-dropdown"
                                    title={(this.props.area == 'internal') ? 'Internal area' : 'Client area' } 
                                    className='navBtn'>
                                <MenuItem onSelect={this.areaClick} eventKey="1">{(this.props.area == 'internal') ? 'Switch to Client area' : 'Switch to Internal area' }</MenuItem>
                                </DropdownButton>
                        }

                        <Button className={usertype == 'Admin' ? 'navBtn' : 'hidden'} onClick={() => this.handleClick('project')}>Open Project</Button>
                        <Button className='navBtn' disabled={isInternal && this.props.area == 'client'} onClick={() => this.handleClick('newIssue')}>New Issue</Button>
                        {(this.props.batchIssues)
                            ? <Button className='navBtn' disabled={(this.props.batchIssues.length == 0)} onClick={() => this.handleClick('batch')}>Batch Issues</Button>
                            : null
                        }
                        {/* <Button className='navBtn' onClick={this.myIssues}>My Issues</Button> */}
                        <DropdownButton className='navBtn' title='User options' id="bg-nested-dropdown">
                            <MenuItem header>{this.props.user.username}</MenuItem>
                            <MenuItem divider/>
                            <MenuItem className={usertype == 'Admin' ? '' : 'hidden'} eventKey="1" onSelect={() => this.handleClick('addproject')}>Create Project</MenuItem>    
                            <MenuItem className={usertype == 'Admin' ? '' : 'hidden'} eventKey="2" onSelect={() => this.handleClick('adduser')}>Manage Users</MenuItem>  
                            <MenuItem eventKey="3" onSelect={this.logout}>Log out</MenuItem>
                        </DropdownButton>
                        <OpenProjectModal {...this.props}/>
                        <NewIssueModal {...this.props}/>
                        <BatchIssuesModal {...this.props}/>
                        <AddUserModal {...this.props}/>
                        <AddProjectModal {...this.props}/>
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
                        {(this.props.user.username != null)
                            ?
                            <DropdownButton className='navBtn' title='User options' id="bg-nested-dropdown">
                                <MenuItem header>{this.props.user.username}</MenuItem>
                                <MenuItem divider/>
                                <MenuItem className={usertype == 'Admin' ? '' : 'hidden'} eventKey="1" onSelect={this.createProject}>Create Project</MenuItem>    
                                <MenuItem className={usertype == 'Admin' ? '' : 'hidden'} eventKey="2" onSelect={this.adduser}>Manage Users</MenuItem>  
                                <MenuItem eventKey="3" onSelect={this.logout}>Log out</MenuItem>
                            </DropdownButton>
                            :
                            null
                        }
                    </ButtonGroup>  
                }
            </div>
            );
        }
    }

NavBar.propTypes = {
    params : PropTypes.object.isRequired,
    username : PropTypes.string
};


export default connect()(NavBar);
