import React, {PropTypes} from 'react';

const TextStatic = ({label, value}) => {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label">{label}</label>
      <div className="col-sm-10 field">
        <div className="form-control static">{value}</div>
      </div>
    </div>
  );
};

export default TextStatic;