import React, { PropTypes } from 'react';
import IssueList from './issues/IssueList';
import IssueManager from './issues/IssueManager';
import SideBar from './SideBar';
import NavBar from './NavBar';
import NewIssueForm from './NewIssueForm';


class IssuePage extends React.Component{

    render(){
        return(
            <div id="issuePage" className="container-fluid">
                <div className="row">
                    <div id="sideBar">
                        <SideBar projectCode={this.props.params.projectCode} {...this.props}/>
                    </div>
                    <div id="issuelist" className="col-sm-5">
                        <IssueList {...this.props}/>
                    </div>
                    <div id="issueManager" className="col-sm-6">
                        <IssueManager {...this.props}/>
                        <NewIssueForm {...this.props}/>
                    </div>
                </div>
            </div>
        );
    }
}

IssuePage.propTypes = {
    params : PropTypes.array.isRequired
};

export default IssuePage;