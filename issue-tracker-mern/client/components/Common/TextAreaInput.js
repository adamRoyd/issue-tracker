import React, {PropTypes} from 'react';

const TextAreaInput = ({name, label, onChange, placeholder, value, error, wrapperClass, width, textAreaClass }) => {
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className="form-group row">
        {(label)
          ? <label className="col-sm-2 col-form-label" htmlFor={name}>{label}</label>
          : null
        }
        <div className={width}>
          <textarea
            type="text"
            name={name}
            className={textAreaClass}
            placeholder={placeholder}
            value={value}
            onChange={onChange}/>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
    </div>
  );
};

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextAreaInput;