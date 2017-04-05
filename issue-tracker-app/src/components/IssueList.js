import React from 'react';
import Issue from './Issue';

class IssueList extends React.Component{
    render(){
        return(
            <div>
                <p>ISSUE LIST</p>
                {/*Use the spread operator to pass down all the props. Key can't be used in props*/}
                {this.props.posts.map((post, i) => <Issue {...this.props} key={i} i={i} post={post}/>)}
            </div>
        );
    }
}

export default IssueList;