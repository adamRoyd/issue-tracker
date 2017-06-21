import React,{getInitialState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import { batchIssueRequest } from '../../actions/IssueActions';
import { getAssignees } from '../../reducers/AssigneeReducer';
import { getComments } from '../../reducers/CommentReducer';
import { getPots } from '../../reducers/IssueFilterReducer';
import BatchIssueForm from '../Issue/BatchIssueForm';

class BatchIssuesModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            batchOptions : {
                pots: 'No Change',
                assigned: 'No Change'    
            },
            errors : {}
        };
        this.updateBatchState = this.updateBatchState.bind(this);
        this.batchIssues = this.batchIssues.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }
    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }
    updateBatchState(event){
        const field = event.target.name;
        let batchOptions = this.state.batchOptions;
        batchOptions[field] = event.target.value;
        return this.setState({batchOptions : batchOptions});
    }
    batchIssues(event){
        event.preventDefault();
        this.props.dispatch(batchIssueRequest(this.props.batchIssues,this.state.batchOptions));
        return this.setState({ showModal: false });
    }
    render(){
        return(
            <div className="nav-div">
                <button 
                className="btn"
                onClick={this.open}
                >
                {this.props.buttonName}
                </button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Batch Issues</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <BatchIssueForm
                            batchOptions={this.state.batchOptions}
                            errors={this.state.errors}
                            onChange={this.updateBatchState}
                            onSave={this.batchIssues}
                            assignees={this.props.assignees}
                            pots={this.props.pots}
                            {...this.props}/>                       
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn" onClick={this.close}>Close</button>
                        <button className="btn" onClick={this.batchIssues}>Save</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

BatchIssuesModal.propTypes = {
    user : PropTypes.string.isRequired,
    assignees : PropTypes.array.isRequired,
    buttonName : PropTypes.string,
    params : PropTypes.object.isRequired,
    batchIssues : PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        assignees: getAssignees(state),
        comments : getComments(state),
        pots : getPots(state)
    };
}

export default connect(mapStateToProps)(BatchIssuesModal);
