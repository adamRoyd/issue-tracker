import React, { PropTypes } from 'react';

const TextInput = ({ name, label, onChange, placeholder, value, error, isStatic }) => {
  let wrapperClass = 'form-group row';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label className="col-sm-3 col-form-label" htmlFor={name}>{label}</label>
      {(!isStatic)
        ?
        <div className="col-sm-9 field">
          <input
            type="text"
            name={name}
            className="form-control"
            placeholder={placeholder}
            value={value}
            onChange={onChange} />
        </div>
        :
        <div className="col-sm-9 field">
          <div className={'form-control static'}>{value}</div>
        </div>
      }
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;