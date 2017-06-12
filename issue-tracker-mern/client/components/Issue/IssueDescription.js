import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import img from '../../../test.png'
var url = require("file-loader!../../../uploads/test.png");

class IssueDescription extends React.Component{
    render(){
        console.log(url);
        return(
            <div className="col-sm-7">
                <p>{this.props.issue.description}</p>
                {/*<img src={require('../../../test.png')} width="50" height="50"/>*/}
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