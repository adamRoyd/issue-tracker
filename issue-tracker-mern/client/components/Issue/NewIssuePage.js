import React, { getInitialState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Browser from 'detect-browser';
import categories from '../../constants/categories';
import locations from '../../constants/locations';
import status from '../../constants/status';
import { addIssueRequest, uploadFileRequest } from '../../actions/IssueActions';
import { getAssignees } from '../../reducers/AssigneeReducer';
import { getAttachments } from '../../reducers/AttachmentReducer';
import { getIssues } from '../../reducers/IssueReducer';
import { getArea } from '../../reducers/AreaReducer';
import { getUser } from '../../reducers/UserReducer';
import { getMessage } from '../../reducers/MessageReducer';
import NewIssueForm from '../IssueForms/NewIssueForm';

const initialIssueState = {
    location: '',
    screen: '',
    category: '',
    type: 'Not sure',
    assigned: '',
    description: '',
    browser: Browser.name + ' ' + Browser.version,
}

class NewIssuePage extends React.Component {
    constructor(props) {
        super(props);
        const screenNumber = this.props.params.area == 'new' ? this.props.params.filter : '';
        this.state = {
            showModal: false,
            issue: {
                location: '',
                screen: screenNumber,
                category: '',
                type: 'Not sure',
                assigned: '',
                description: '',
                browser: Browser.name + ' ' + Browser.version
            },
            errors: '',
            success: false,
            files: [],
        };
        this.updateIssueState = this.updateIssueState.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        this.saveIssue = this.saveIssue.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.validate = this.validate.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
    close() {
        this.setState({ showModal: false, issue: {}, errors: {} });
    }
    open() {
        this.setState({ showModal: true });
    }
    updateIssueState(event) {
        const field = event.target.name;
        let issue = this.state.issue;
        issue[field] = event.target.value;
        return this.setState({ issue });
    }
    onCommentChange(html) {
        let issue = this.state.issue;
        issue['description'] = html;
        return this.setState({ issue });
    }
    saveIssue(event) {
        event.preventDefault();
        const errors = this.validate(this.state.issue);
        const isValid = this.isValid(errors);
        const screenNumber = this.props.params.area == 'new' ? this.props.params.filter : '';
        if (!isValid) {
            return this.setState({ success: false, errors });
        }
        this.props.dispatch(addIssueRequest(this.state.issue, this.props.attachments, this.props.issues, this.props.params.projectCode, this.props.area, this.props.username))
            .then(() => {
                this.setState({
                    issue: Object.assign({}, initialIssueState),
                    success: this.props.message.success,
                    errors: { message: this.props.message.text },
                });
            });
    }
    onDrop(files) {
        this.setState({
            files,
        });
        this.props.dispatch(uploadFileRequest(files));
    }
    validate(issue) {
        let errors = {};
        if (issue.location == initialIssueState.location) {
            errors = Object.assign({}, errors, { location: 'Error' });
        }
        if (!issue.screen) {
            errors = Object.assign({}, errors, { screen: 'Error' });
        }
        if (issue.category == initialIssueState.category) {
            errors = Object.assign({}, errors, { category: 'Error' });
        }
        if (issue.assigned == initialIssueState.assigned) {
            errors = Object.assign({}, errors, { assigned: 'Error' });
        }
        let div = document.createElement('div');
        div.innerHTML = issue.description;
        let descriptionAsString = div.textContent || div.innerText || '';
        if (issue.description.length == 0) {
            errors = Object.assign({}, errors, {
                description: 'Error',
            });
        }
        return errors;
    }
    isValid(errors) {
        return Object.keys(errors).length === 0 && errors.constructor === Object;
    }
    render() {
        const pageContainerClass = this.props.params.area === 'new' ? 'container-fluid' : 'container-fluid visible-phone';
        const hasErrors = Object.keys(this.state.errors).length;
        return (
            <div id="newIssuePage" className={pageContainerClass}>
                <h3>New issue for {this.props.params.projectCode}</h3>
                <NewIssueForm
                    issue={this.state.issue}
                    errors={this.state.errors}
                    onChange={this.updateIssueState}
                    onCommentChange={this.onCommentChange}
                    assignees={this.props.assignees}
                    locations={this.props.locations}
                    categories={this.props.categories}
                    onDrop={this.onDrop}
                    files={this.state.files}
                    params={this.props.params}
                    {...this.props}
                />
                {hasErrors ?
                    <div className={this.state.success ? 'infomessage success' : 'infomessage error'}>
                        {this.state.success ? 'Issue created. Fill out the form again to create another issue.' : 'Please select a value for the items marked red.'}
                    </div>
                    :
                    <span />
                }
                <div className="right-align">
                    <button className="btn" onClick={this.close}>Close</button>
                    <button className="btn" onClick={this.saveIssue}>Create issue</button>
                </div>
            </div>
        );
    }
}

NewIssuePage.propTypes = {
    issue: PropTypes.object,
    assignees: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        assignees: getAssignees(state, ownProps.params.projectCode),
        message: getMessage(state),
        attachments: getAttachments(state),
        area: getArea(state),
        username: getUser(state).username,
        categories,
        locations,
        status,
    };
}

export default connect(mapStateToProps)(NewIssuePage);
