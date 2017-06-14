import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Attachment from '../common/Attachment';
//import img from '../../../test.png'

class IssueDescription extends React.Component{
    render(){
        return(
            <div>
                <div id="issueDescription">
                    <p>{this.props.issue.description}</p>
                </div>
                <div id="issueAttachments">
                    {this.props.issue.attachments.map((a,i) => {
                        return <Attachment key={i} path={a}/>
                    })}
                </div>
            </div>
        );
    }
}

IssueDescription.propTypes = {
    issue : PropTypes.object.isRequired
};


export default IssueDescription;