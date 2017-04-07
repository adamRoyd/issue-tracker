import React from 'react';
import IssueList from './IssueList';
import IssueManager from './IssueManager';

class SideBar extends React.Component{
    render(){
        return(
            <div className="row">
                <div id="sideBar" className="col-sm-1">
                    <h3>Nav</h3>
                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                </div>
                <div id="issuelist" className="col-sm-5">
                    <IssueList {...this.props}/>
                </div>
                {/*TO DO show the issues dependent on issue status. there should be one issue list and then the rows are filtered.*/}
                <div id="issueManager" className="col-sm-6">
                    <IssueManager {...this.props}/>
                </div>
            </div>
        );
    }
}

export default SideBar;