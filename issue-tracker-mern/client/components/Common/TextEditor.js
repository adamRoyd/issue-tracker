import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
 
class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
      // console.log('CONTENT STATE');
      // let contentstate = this.state.editorState.getCurrentContent();
      // let html = stateToHTML(contentstate);
      // console.log(html);
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    );
  }
}

export default TextEditor;