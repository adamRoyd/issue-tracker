import React, {PropTypes} from 'react';

const SelectInput = ({name, label, onChange, value, error, options,defaultOption}) => {
  return (
    <div className="form-group row">
      <label className="col-sm-3 col-form-label" htmlFor={name}>{label}</label>
      <div className="col-sm-9 field">
        {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="form-control">
          {(defaultOption)
            ? <option selected>{defaultOption}</option>
            : null
          }
          {options.map((option,i) => {
            return <option key={i} value={option}>{option}</option>;
          })
          }
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string
  // options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;