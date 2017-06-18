import React, {PropTypes} from 'react';

const TextStatic = ({label, value}) => {
  return (
    <div className="form-group row">
      <label className="col-sm-3 col-form-label">{label}</label>
      <div className="col-sm-9 field">
        <div className="form-control static">{value}</div>
      </div>
    </div>
  );
};

TextStatic.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default TextStatic;