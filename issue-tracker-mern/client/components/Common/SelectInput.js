import React, {PropTypes} from 'react';

const SelectInput = ({name, label, onChange, value, error, options, defaultOption, isStatic}) => {
  let wrapperClass = 'form-group row';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label className="col-sm-2 col-form-label" htmlFor={name}>{label}</label>
      <div className="col-sm-10 field">
        {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
        {(isStatic) ? 
          <div className="form-control static">{value}</div>
          :
          <select
          name={name}
          value={value}
          onChange={onChange}
          className={isStatic ? 'form-control static' : 'form-control'}
          >
          {(defaultOption)
            ? <option selected>{defaultOption}</option>
            : null
          }
          {options.map((option,i) => {
            return <option key={i} value={option}>{option}</option>;
          })
          }
          </select>
        }
        
        {/*{error && <div className="alert alert-danger">{error}</div>}*/}
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