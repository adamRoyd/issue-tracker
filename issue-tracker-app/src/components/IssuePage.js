import React from 'react';
import IssueList from './issues/IssueList';
import IssueManager from './issues/IssueManager';
import SideBar from './SideBar';
import TopBar from './TopBar';

class IssuePage extends React.Component{
    render(){
        return(
            <div id="issuePage" className="container-fluid">
                <div className="row">
                    <TopBar/>
                </div>
                <div className="row">
                    <div id="sideBar">
                        <SideBar {...this.props}/>
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

export default IssuePage;