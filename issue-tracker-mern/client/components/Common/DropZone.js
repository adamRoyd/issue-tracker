import React, {PropTypes} from 'react';
import Dropzone from 'react-dropzone';

const DropZone = ({name, label, onDrop, files }) => {
  return (
    <div className="form-group row">
      <label className="col-sm-3 col-form-label" htmlFor={name}>{label}</label>
      <div className="col-sm-9 field">
        <Dropzone className="form-control dashed" onDrop={onDrop}>
            <p className="text-center">Drop files here, or <a href="#">select</a></p>
        </Dropzone>
        <ul>
            {
                files.map(f => <li>{f.name} - {f.size} bytes</li>)
            }
        </ul>
      </div>
    </div>
  );
};

DropZone.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired
};

export default DropZone;