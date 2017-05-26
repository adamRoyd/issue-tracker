import React,{getInitialState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import ProjectPicker from '../Common/ProjectPicker';

class OpenProjectModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }
    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
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

    };
}

export default connect(mapStateToProps)(OpenProjectModal);
