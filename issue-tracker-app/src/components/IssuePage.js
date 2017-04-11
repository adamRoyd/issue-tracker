import React from 'react';
import IssueList from './IssueList';
import IssueManager from './IssueManager';
import SideBar from './SideBar';

class IssuePage extends React.Component{

    filterPots(){
        console.log(this.refs);
        this.props.setIssueFilter(this.refs.new.id);
    }
    render(){
        this.filterPots = this.filterPots.bind(this);
        return(
            <div id="issuePage" className="row">
                <div id="sideBar" className="col-sm-1">
                    <SideBar {...this.props}/>
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

export default IssuePage;