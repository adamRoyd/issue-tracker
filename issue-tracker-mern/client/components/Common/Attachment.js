import React from 'react';

class Attachment extends React.Component {
  render() {
    return (
      <div className="inline-block">
          <a href={`http://localhost:8000/${this.props.path}`} target="_blank">Attachment {this.props.number + 1}</a>
      </div>
    );
  }
}

export default Attachment;