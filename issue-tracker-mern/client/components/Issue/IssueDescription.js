import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Attachment from '../common/Attachment';
//import img from '../../../test.png'

class IssueDescription extends React.Component{
    render(){
        console.log(this.props.issue.attachments);
        return(
            <div id="issueDescription">
                <div dangerouslySetInnerHTML={{__html: this.props.issue.description}}/>
                <div id="issueAttachments">
                    {this.props.issue.attachments.map((a,i) => {
                        return <Attachment key={i} number={i} path={a}/>
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