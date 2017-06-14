import React from 'react';
var file = require("file-loader!../../../uploads/test.png");

class Attachment extends React.Component {
  render() {
    return (
        <div className="inline-block">
            <img src={require("../../../uploads/test.png")} width="30px" height="30px"/>
            <a href={file} target="_blank">{this.props.path}</a>
        </div>
    );
  }
}

export default Attachment;