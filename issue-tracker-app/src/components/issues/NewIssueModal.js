import React,{getInitialState} from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
import NewIssueForm from './NewIssueForm';

class NewIssueModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {showModal:false};
    }
    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }
    render(){
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        return(
            <div className="nav-div">
                <button 
                className="btn"
                onClick={this.open}
                >
                New Issue
                </button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Issue</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewIssueForm {...this.props}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn" onClick={this.close}>Close</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


export default NewIssueModal;