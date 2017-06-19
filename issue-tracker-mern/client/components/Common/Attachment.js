import React from 'react';
var file = require("file-loader!../../../uploads/test.png");

class Attachment extends React.Component {
  render() {
    return (
      <div className="inline-block">
          {/*<img src={require("../../../uploads/test.png")} width="30px" height="30px"/>*/}
          <a href={`http://localhost:8000/${this.props.path}`} target="_blank">Attachment {this.props.number + 1}</a>
      </div>
    );
  }
}

export default Attachment;