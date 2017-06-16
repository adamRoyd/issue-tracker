import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { downloadFileRequest } from '../../actions/IssueActions';
var file = require("file-loader!../../../uploads/test.png");

class Attachment extends React.Component {
  render() {
    return (
        <div className="inline-block">
            <img src={require("../../../uploads/test.png")} width="30px" height="30px"/>
            <a onClick={this.props.dispatch(downloadFileRequest)} href={file} target="_blank">{this.props.path}</a>
        </div>
    );
  }
}


export default connect()(Attachment);