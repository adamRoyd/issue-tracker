import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ProjectPicker from './ProjectPicker';
import NewIssueModal from '../Modals/NewIssueModal';
import BatchIssuesModal from '../Modals/BatchIssuesModal';
import OpenProjectModal from '../Modals/OpenProjectModal';

class NavBar extends React.Component{
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
                    <Link to={`/`}><button className="btn">Log out</button></Link>
                    <div className="nav-div right">
                        <h4 className="white">User: {this.props.user}</h4>
                    </div>
                </div>
            );
        }
    }

NavBar.propTypes = {
    params : PropTypes.object.isRequired,
    user : PropTypes.string.isRequired
};


export default NavBar;