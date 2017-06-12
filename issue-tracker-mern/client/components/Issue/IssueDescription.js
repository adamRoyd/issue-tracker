import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IssueDescription extends React.Component{
    render(){
        return(
            <div className="col-sm-7 no-gutter">
                <p>{this.props.issue.description}</p>
            {/*<table id="issueStats" className="col-sm-4 no-gutter">
                <tr>
                    <td>Id</td>
                    <td>{this.props.issue.id}</td>
                </tr>
                <tr>
                    <td>Screen</td>
                    <td>{this.props.issue.sco + "_" + this.props.issue.screen}</td>
                </tr>
                <tr>
                    <td>Location</td>
                    <td>{this.props.issue.location}</td>
                </tr>
                <tr>
                    <td>Category</td>
                    <td>{this.props.issue.category}</td>
                </tr>
                <tr>
                    <td>Browser</td>
                    <td>{this.props.issue.browser}</td>
                </tr>
            </table>*/}
            </div>

        );
    }
}

IssueDescription.propTypes = {
    issue : PropTypes.object.isRequired
};


export default IssueDescription;