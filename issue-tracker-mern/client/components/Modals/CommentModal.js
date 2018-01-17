import React, { getInitialState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import { closeModal } from '../../actions/ModalActions';
import Comment from '../Comment/Comment';

class CommentModal extends React.Component{
    constructor(props){
        super(props);
        this.close = this.close.bind(this);
    }
    close() {
        this.props.dispatch(closeModal());
    }
    render(){
        const comments = this.props.issueComments.sort((a,b) => {
            return new Date(b.time) - new Date(a.time);
        })
        return(
            <div className="nav-div">
                <Modal show={this.props.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Comments for issue X</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {comments.map((comment,i) =>
                            <Comment 
                                key={i} 
                                comment={comment}
                                issue={this.props.issue}/>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn" onClick={this.close}>Close</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

CommentModal.propTypes = {
    buttonName : PropTypes.string,
    params : PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        showModal: state.modal == 'comments'
    };
}

export default connect(mapStateToProps)(CommentModal);
