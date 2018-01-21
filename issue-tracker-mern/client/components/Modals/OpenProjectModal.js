import React,{getInitialState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import { closeModal } from '../../actions/ModalActions';
import ProjectPicker from '../Common/ProjectPicker';

class OpenProjectModal extends React.Component{
    constructor(props){
        super(props);
        this.close = this.close.bind(this);
    }
    close() {
        this.props.dispatch(closeModal());
    }
    render(){
        return(
            <div>

                <Modal show={this.props.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Open Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProjectPicker
                            {...this.props}
                            close={this.close}
                            />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn" onClick={this.close}>Close</button>
                        {/*<button className="btn" onClick={this.batchIssues}>Save</button>*/}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

OpenProjectModal.propTypes = {
    buttonName : PropTypes.string,
    params : PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        showModal: state.modal == 'project'
    };
}

export default connect(mapStateToProps)(OpenProjectModal);
