import React, {PropTypes} from 'react';

const TextAreaInput = ({name, label, onChange, placeholder, value, error,wrapperClass}) => {
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
        <textarea
          type="text"
          name={name}
          className="form-control row-2"
          placeholder={placeholder}
          value={value}
          onChange={onChange}/>
        {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextAreaInput;