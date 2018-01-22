import React,{componentWillReceiveProps} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import { addCommentRequest } from '../../actions/CommentActions';
import { saveIssueRequest } from '../../actions/IssueActions';
import { getAssignees } from '../../reducers/AssigneeReducer';
import { getPots } from '../../reducers/IssueFilterReducer';
import IssueDescription from './IssueDescription';
import IssueForm from '../IssueForms/IssueForm';
import { getArea } from '../../reducers/AreaReducer';
import { Editor, EditorState, RichUtils, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

class IssueManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            errors : {},
            comment : {},
            issue : Object.assign({},this.props.issue),
            toggleOptions : false,
            submitDisabled : true
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => {
            this.onCommentChange(stateToHTML(this.state.editorState.getCurrentContent()));
            this.setState({editorState})
        };
        this.toggleAdvancedOptions = this.toggleAdvancedOptions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        this.onIssueChange = this.onIssueChange.bind(this);
    }
    componentWillReceiveProps(){
        return this.setState({issue : Object.assign({},this.props.issue)});
    }
    toggleAdvancedOptions() {
        return this.setState({toggleOptions : !this.state.toggleOptions});
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.dispatch(addCommentRequest(this.state.comment,this.state.issue.status,this.props.params));
        this.props.dispatch(saveIssueRequest(this.state.issue, this.props.area));
        const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
        this.setState({
            editorState,
            comment : {text : ''},
            submitDisabled : true
        });
        if(this.props.issue.status != this.state.issue.status){
            browserHistory.push(`/${this.props.params.projectCode}/(:area)/${this.props.params.filter}/`);
        }

    }
    onCommentChange(html){
        let comment = this.state.comment;
        if(html != '<p><br></p>'){
            this.setState({
                comment : {
                    user: this.props.username,
                    text: html
                },
                submitDisabled : false
            });
        }
    }
    onIssueChange(event){
        const field = event.target.name;
        let issue = this.state.issue;
        issue[field] = event.target.value;
        return this.setState({issue : issue});
    }
    render(){
        const i = this.props.issues.findIndex((issue) => issue.id == this.props.params.id);
        const issue = this.props.issues[i];
        return(
            <div className='issueDescriptionAndSettings'>
                <h4>Issue Description</h4>
                <IssueDescription issue={this.state.issue}/>
                <div className='commentBox'>
                    {((this.props.area == 'client') && (this.props.usertype != 'Client'))
                    ?
                    <p className='error'><br/><strong>{(this.props.area == 'client') ? 'This issue is in the client pot and cannot be edited.' : 'This issue is closed and cannot be edited.'}</strong></p>
                    :
                    <div className='textEditor' onClick={this.focus}>
                        <Editor
                            className={this.props.errors ? 'hasError' : ""}
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            placeholder="Enter a comment..."
                            ref="editor"/>
                    </div>
                    }
                </div>
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
                    categories={this.props.categories}
                    />
                <div id="issueManagerButtons" className='anchorBottom'>
                    <button className="btn" onClick={this.handleSubmit} disabled={this.state.submitDisabled}>Submit</button>  
                    {/* <button className="btn" onClick={this.toggleAdvancedOptions}>Toggle advanced options</button> */}
                </div>
            </div>
        );
    }
}

IssueManager.propTypes = {
    assignees : PropTypes.array.isRequired,
    status : PropTypes.array.isRequired,
    params : PropTypes.object.isRequired,
    locations : PropTypes.array.isRequired,
    categories : PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
    return{
        assignees: getAssignees(state,ownProps.params.projectCode),
        pots: getPots(state.area,ownProps.params.area),
        area: getArea(state)
    };
}

export default connect(mapStateToProps)(IssueManager);
