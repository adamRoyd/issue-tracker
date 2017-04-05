import React from 'react';
import IssueList from './IssueList';

class SideBar extends React.Component{
    render(){
        return(
            <div className="row">
                <div id="SideBar" className="col-sm-2">
                    <h3>Nav</h3>
                </div>
                <div id="list" className="col-sm-10">
                    <IssueList {...this.props}/>
                </div>
                {/*TO DO show the issues dependent on issue status. there should be one issue list and then the rows are filtered.*/}
                
            </div>
        );
    }
}

export default SideBar;