import React from 'react';

class Issue extends React.Component{
    render(){
        return(
            <tr>
                <td>{this.props.issue.id}</td>
                <td>screen</td>
                <td>cat</td>
                <td>des</td>                                
            </tr>
        );
    }
}

export default Issue;