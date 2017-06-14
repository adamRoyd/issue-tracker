import React from 'react';
//var url = require("file-loader!../../../uploads/test.png");

class Attachment extends React.Component {
  render() {
    return (
        <div id="issueAttachments">
            <img src={require("../../../uploads/test.png")} width="30px" height="30px"/>
            <a href="" target="_blank">{this.props.path}</a>
        </div>
    );
  }
}

export default Attachment;