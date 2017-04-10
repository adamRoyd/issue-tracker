import React from 'react';
import IssueList from './IssueList';
import IssueManager from './IssueManager';

class SideBar extends React.Component{

    filterPots(){
        console.log(this.refs);
        this.props.setIssueFilter(this.refs.new.id);
    }
    render(){
        this.filterPots = this.filterPots.bind(this);
        return(
            <div className="row">
                <div id="sideBar" className="col-sm-1">
                    <h3>Nav</h3>
                    <a href="#" id="SHOW_ALL" ref="all" onClick={this.filterPots}>All</a>
                    <a href="#" id="SHOW_NEW" ref="new" onClick={this.filterPots}>New</a>
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