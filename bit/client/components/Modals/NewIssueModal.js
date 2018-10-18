import React, { getInitialState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Browser from 'detect-browser';
import { addIssueRequest, uploadFileRequest } from '../../actions/IssueActions';
import { getAssignees } from '../../reducers/AssigneeReducer';
import { closeModal } from '../../actions/ModalActions';
import { getAttachments } from '../../reducers/AttachmentReducer';
import { getIssues } from '../../reducers/IssueReducer';
import NewIssueForm from '../IssueForms/NewIssueForm';

class NewIssueModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            issue: {
                location: 'Select a location',
                screen: '',
                category: 'Select a Category',
                assigned: 'Unassigned',
                type: 'Not sure',
                description: '',
                browser: Browser.name + ' ' + Browser.version,
            },
            initialIssueState: {
                location: 'Select a location',
                screen: 'Enter a screen',
                category: 'Select a Category',
                assigned: 'Unassigned',
                type: 'Not sure',
                description: '',
                browser: Browser.name + ' ' + Browser.version,
            },
            errors: {},
            files: [],
        };
        this.updateIssueState = this.updateIssueState.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        this.saveIssue = this.saveIssue.bind(this);
        this.close = this.close.bind(this);
        this.validate = this.validate.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
    close() {
        this.setState({ issue: {}, errors: {} });
        this.props.dispatch(closeModal());
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
        if (Object.keys(errors).length === 0 && errors.constructor === Object) {
            this.props.dispatch(
                addIssueRequest(
                    this.state.issue,
                    this.props.attachments,
                    this.props.issues,
                    this.props.params.projectCode,
                    this.props.area,
                    this.props.user.username
                )
            );
            return this.setState({
                showModal: false,
                issue: {},
                errors: {},
            });
        } else {
            return this.setState({ errors });
        }
    }
    onDrop(files) {
        this.setState({
            files,
        });
        this.props.dispatch(uploadFileRequest(files));
    }
    validate(issue) {
        let errors = {};
        const initial = this.state.initialIssueState;
        if (issue.location == initial.location) {
            errors = Object.assign({}, errors, {
                location: 'Error',
            });
        }
        if (issue.screen == initial.screen || !issue.screen) {
            errors = Object.assign({}, errors, {
                screen: 'Error',
            });
        }
        if (issue.category == initial.category) {
            errors = Object.assign({}, errors, {
                category: 'Error',
            });
        }
        if (issue.assigned == initial.assigned) {
            errors = Object.assign({}, errors, {
                assigned: 'Error',
            });
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
    render() {
        return (
            <div>
                <Modal show={this.props.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Issue for {this.props.params.projectCode.toUpperCase()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                            username={this.props.user.username}
                            {...this.props}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        {(Object.keys(this.state.errors).length) ?
                            <div className="infomessage error"><p>Please select a value for the items marked red.</p></div>
                            :
                            <span/>
                        }
                        <button className="btn" onClick={this.close}>Close</button>
                        <button className="btn" onClick={this.saveIssue}>Create issue</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

NewIssueModal.propTypes = {
    issue: PropTypes.object,
    assignees: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
    buttonName: PropTypes.string,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        assignees: getAssignees(state, ownProps.params.projectCode),
        attachments: getAttachments(state),
        showModal: state.modal == 'newIssue',
    };
}

export default connect(mapStateToProps)(NewIssueModal);
