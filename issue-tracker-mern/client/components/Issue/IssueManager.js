import React, { componentWillReceiveProps } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { addCommentRequest } from '../../actions/CommentActions';
import { saveIssueRequest } from '../../actions/IssueActions';
import { getAssignees } from '../../reducers/AssigneeReducer';
import { getPots } from '../../reducers/IssueFilterReducer';
import { getIssue } from '../../reducers/IssueReducer';
import IssueDescription from './IssueDescription';
import IssueForm from '../IssueForms/IssueForm';
import { getArea } from '../../reducers/AreaReducer';
import { Editor, EditorState, RichUtils, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Attachment from '../common/Attachment';

class IssueManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            errors: {},
            comment: {},
            issue: this.props.issue,
            toggleOptions: false,
            submitDisabled: true
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => {
            this.onCommentChange(stateToHTML(this.state.editorState.getCurrentContent()));
            this.setState({ editorState })
        };
        this.toggleAdvancedOptions = this.toggleAdvancedOptions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        this.onIssueChange = this.onIssueChange.bind(this);
    }
    toggleAdvancedOptions() {
        return this.setState({ toggleOptions: !this.state.toggleOptions });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(addCommentRequest(this.state.comment, this.state.issue.status, this.props.params));
        this.props.dispatch(saveIssueRequest(this.state.issue, this.props.area));
        const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
        this.setState({
            editorState,
            comment: { text: '' },
            submitDisabled: true
        });
        if (this.props.issue.status != this.state.issue.status) {
            browserHistory.push(`/${this.props.params.projectCode}/(:area)/${this.props.params.filter}/`);
        }

    }
    onCommentChange(html) {
        let comment = this.state.comment;
        if (html != '<p><br></p>') {
            this.setState({
                comment: {
                    user: this.props.username,
                    text: html
                },
                submitDisabled: false
            });
        }
    }
    onIssueChange(event) {
        const field = event.target.name;
        let issue = this.state.issue;
        issue[field] = event.target.value;
        return this.setState({ issue: issue });
    }
    render() {
        return (
            <div className='issue-manager'>
                <div className='issue-manager-description'>
                    <h4>Issue Description</h4>
                    {this.props.issue &&
                        <IssueDescription issue={this.props.issue} />
                    }
                    <div className='comment-box'>
                        {((this.props.area == 'client') && (this.props.usertype != 'Client'))
                            ?
                            <p className='error'><br /><strong>{(this.props.area == 'client') ? 'This issue is in the client pot and cannot be edited.' : 'This issue is closed and cannot be edited.'}</strong></p>
                            :
                            <div className='text-editor' onClick={this.focus}>
                                <Editor
                                    className={this.props.errors ? 'hasError' : ""}
                                    editorState={this.state.editorState}
                                    onChange={this.onChange}
                                    placeholder="Enter a comment..."
                                    ref="editor" />
                            </div>
                        }
                    </div>
                    <div className="issue-manager-buttons">
                        <button className="btn" onClick={this.handleSubmit} disabled={this.state.submitDisabled}>Submit</button>
                        {/* <button className="btn" onClick={this.toggleAdvancedOptions}>Toggle advanced options</button> */}
                        {this.props.issue &&
                            <div className='issue-attachments'>
                                {
                                    this.props.issue.attachments.map((a, i) => { return <Attachment key={i} number={i} path={a} /> })
                                }
                            </div>
                        }
                    </div>
                </div>
                {this.state.issue &&
                    <IssueForm
                        issue={this.state.issue}
                        comment={this.state.comment}
                        errors={this.state.errors}
                        handleSubmit={this.handleSubmit}
                        assignees={this.props.assignees}
                        onCommentChange={this.onCommentChange}
                        onIssueChange={this.onIssueChange}
                        status={this.props.pots}
                        displayAdvancedOptions={this.state.toggleOptions}
                        locations={this.props.locations}
                        categories={this.props.categories} />
                }
            </div>
        );
    }
}

IssueManager.propTypes = {
    assignees: PropTypes.array.isRequired,
    status: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    locations: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        issue: getIssue(state.issues, ownProps.params.id),
        assignees: getAssignees(state, ownProps.params.projectCode),
        pots: getPots(state.area, ownProps.params.area),
        area: getArea(state)
    };
}

export default connect(mapStateToProps)(IssueManager);
