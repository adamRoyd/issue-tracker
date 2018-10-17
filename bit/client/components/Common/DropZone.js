import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';


const DropZone = ({ name, label, onDrop, attachments }) => {
    return (
        <div className="form-flex">
            <label className="form-label" htmlFor={name}>{label}</label>
            <div style={{ 'width': '100%' }}>
                <Dropzone className="form-control dashed" onDrop={onDrop}>
                    <p className="text-center">Drop files here, or <a href="#">select</a></p>
                </Dropzone>
                <ul>{attachments.map((value, i) => <p key={i}>{value}</p>)}</ul>
            </div>
        </div>
    );
};

DropZone.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onDrop: PropTypes.func.isRequired,
};

export default DropZone;
