import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
//require('../../styles/Draft.css');
 
class TextEditor extends React.Component {
  constructor(props) {
          super(props);
          this.state = {editorState: EditorState.createEmpty()};
          this.focus = () => this.refs.editor.focus();
          this.onChange = (editorState) => {
            this.props.onCommentChange(stateToHTML(this.state.editorState.getCurrentContent()));
            this.setState({editorState})};
          this.logState = () => console.log(this.state.editorState.toJS());
        }

  render() {
    return (
      <div style={styles.root}>
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
            ref="editor"
          />
        </div>
      </div>
    );
  }
}

const styles = {
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  }
};

export default TextEditor;