import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.props.onCommentChange(stateToHTML(this.state.editorState.getCurrentContent()));
      this.setState({ editorState })
    };
  }
  render() {
    return (
      <div className={this.props.error ? "text-editor has-error" : "text-editor"} onClick={this.focus}>
        <Editor
          className={this.props.error ? "has-error" : ""}
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder={this.props.placeholder}
          ref="editor"
        />
      </div>
    );
  }
}

export default TextEditor;