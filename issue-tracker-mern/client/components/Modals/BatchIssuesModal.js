import React,{getInitialState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { closeModal } from '../../actions/ModalActions';
import { batchIssueRequest } from '../../actions/IssueActions';
import { getAssignees } from '../../reducers/AssigneeReducer';
import { getComments } from '../../reducers/CommentReducer';
import { getPots } from '../../reducers/IssueFilterReducer';
import BatchIssueForm from '../IssueForms/BatchIssueForm';

class BatchIssuesModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            batchOptions : {},
            submitDisabled: true
        };
        this.updateBatchState = this.updateBatchState.bind(this);
        this.batchIssues = this.batchIssues.bind(this);
        this.close = this.close.bind(this);
    }
    close() {
        this.setState({ 
            batchOptions: {},
            submitDisabled: true
        });
        this.props.dispatch(closeModal());
    }
    updateBatchState(event){
        const field = event.target.name;
        let batchOptions = this.state.batchOptions;
        batchOptions[field] = event.target.value;
        {(batchOptions.assigned != 'No change' || batchOptions.pot != 'No change')
            ? this.setState({submitDisabled: false})
            : this.setState({submitDisabled: true})
        }
        return this.setState({batchOptions : batchOptions});
    }
    batchIssues(event){
        event.preventDefault();
        browserHistory.push(`/${this.props.params.projectCode}/${this.props.area}/${this.props.params.filter}`);
        this.props.dispatch(batchIssueRequest(this.props.batchIssues,this.state.batchOptions,this.props.params.projectCode));
        return this.setState({ showModal: false });
    }
    render(){
        return(
            <div className="nav-div">
                <Modal show={this.props.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Batch Issues</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <BatchIssueForm
                            batchOptions={this.state.batchOptions}
                            onChange={this.updateBatchState}
                            onSave={this.batchIssues}
                            assignees={this.props.assignees}
                            pots={this.props.pots}
                            {...this.props}/>                       
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn" onClick={this.close}>Close</button>
                        <button className="btn" disabled={this.state.submitDisabled} onClick={this.batchIssues}>Save</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

BatchIssuesModal.propTypes = {
    assignees : PropTypes.array.isRequired,
    buttonName : PropTypes.string
};

function mapStateToProps(state, ownProps) {
    return {
        assignees: getAssignees(state,ownProps.params.projectCode),
        comments : getComments(state),
        pots : getPots(state.area,'internal'),
        showModal: state.modal == 'batch'
    };
}

export default connect(mapStateToProps)(BatchIssuesModal);
