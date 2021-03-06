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
import { openModal } from '../../actions/ModalActions';
import { getUser } from '../../reducers/UserReducer';
import { DropdownButton, MenuItem, ButtonGroup, Button, Navbar, NavDropdown, NavItem, Nav } from 'react-bootstrap';
import BWLogo from '../../assets/BWLogo';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.internalAreaClick = this.internalAreaClick.bind(this);
        this.clientAreaClick = this.clientAreaClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.homeClick = this.homeClick.bind(this);
        this.myIssues = this.myIssues.bind(this);
        this.getNavItems = this.getNavItems.bind(this);
    }

    logout = () => {
        this.props.dispatch(logoutUser());
        this.props.dispatch(logout());
        browserHistory.push('/');
    }

    internalAreaClick = (e) => {
        this.props.dispatch(toggleArea('internal'));
        browserHistory.push(`/${this.props.params.projectCode}/internal/all`);
    }

    clientAreaClick = (e) => {
        this.props.dispatch(toggleArea('client'));
        browserHistory.push(`/${this.props.params.projectCode}/client/all`)
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

    getNavItems = (usertype, projectCode, params) => {
        const isClient = usertype === 'Client';
        const isInternal = usertype == 'Internal';
        const isAdmin = usertype == 'Admin';
        const isClientArea = this.props.area == 'client';
        const isLoggedIn = this.props.user.username != null;
        return (
            <Nav>
                <div className='nav-title-section'><BWLogo />BIT</div>{/*  */}
                {projectCode && isClient && <NavItem className="nav-button">{projectCode.toUpperCase()}</NavItem>}
                {projectCode && !isClient &&
                    <NavDropdown id="areadropdown" title={projectCode.toUpperCase()}>
                        <MenuItem ref='internal' onSelect={this.internalAreaClick}>Internal area</MenuItem>
                        <MenuItem ref='client' onSelect={this.clientAreaClick}>Client area</MenuItem>
                    </NavDropdown>
                }
                {!isClient && isLoggedIn && <NavItem className="nav-button" onSelect={() => this.handleClick('project')}>Open Project</NavItem>}
                {/* <NavItem className='nav-button' onSelect={this.myIssues}>My Issues</NavItem> */}
                {((isClient && isClientArea) || ((isInternal || isAdmin) && !isClientArea)) && projectCode && (params.area != 'new') && <NavItem className="nav-button" onSelect={() => this.handleClick('newIssue')}>New Issue</NavItem>}
                {projectCode && this.props.batchIssues && <NavItem disabled={!this.props.batchIssues.length} className="nav-button" onSelect={() => this.handleClick('batch')}>Batch Issues</NavItem>}
                {isLoggedIn &&
                    (<NavDropdown id="usersettings" eventKey={3} title="User options" id="basic-nav-dropdown">
                        <MenuItem header>{this.props.user.username}</MenuItem>
                        <MenuItem divider />
                        {isAdmin && <MenuItem onSelect={() => this.handleClick('addproject')}>Create Project</MenuItem>}
                        {isAdmin && <MenuItem onSelect={() => this.handleClick('adduser')}>Manage Users</MenuItem>}
                        <MenuItem onSelect={this.logout}>Log out</MenuItem>
                    </NavDropdown>)
                }
            </Nav>
        );
    }
    render() {
        const usertype = this.props.user.usertype;
        let projectCode = this.props.params.projectCode;
        const navItems = this.getNavItems(usertype, projectCode, this.props.params);
        return (
            <Navbar className="nav-bar" collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {navItems}
                </Navbar.Collapse>
                <OpenProjectModal {...this.props} />
                {projectCode && <NewIssueModal {...this.props} />}
                <BatchIssuesModal {...this.props} />
                <AddUserModal {...this.props} />
                <AddProjectModal {...this.props} />
            </Navbar>
        );
    }
}

NavigationBar.propTypes = {
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: getUser(state),
    };
}

export default connect(mapStateToProps)(NavigationBar);
