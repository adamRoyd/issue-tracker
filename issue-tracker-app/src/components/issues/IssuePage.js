import React from 'react';
import PropTypes from 'prop-types';
import IssueList from '../issues/IssueList';
import IssueManager from '../issues/IssueManager';
import SideBar from '../common/SideBar';
import NavBar from '../common/NavBar';
import NewIssueForm from '../issues/NewIssueForm';

class IssuePage extends React.Component{
    render(){
        return(
            <div id="issuePage" className="container-fluid">
                <NavBar {...this.props}/>
                <div className="row">
                    <div id="sideBar">
                        <SideBar projectCode={this.props.params.projectCode} {...this.props}/>
                    </div>
                    <div id="issuelist" className="col-sm-5">
                        <IssueList {...this.props}/>
                    </div>
                    <div id="issueManager" className="col-sm-6">
                        <IssueManager {...this.props}/>
                    </div>
                </div>
            </div>
        );
    }
}

IssuePage.propTypes = {
    params : PropTypes.object.isRequired
};

export default IssuePage;