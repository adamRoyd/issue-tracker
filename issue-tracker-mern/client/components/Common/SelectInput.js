import React, {PropTypes} from 'react';

const SelectInput = ({name, label, onChange, value, error, options, defaultOption, isStatic}) => {
  let wrapperClass = 'form-group row';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label className="col-sm-3 col-form-label" htmlFor={name}>{label}</label>
      <div className="col-sm-9 field">
        {(isStatic) ? 
          <div className={`form-control ${styles['static']}`}>{value}</div>
          :
          <select
          name={name}
          value={value}
          onChange={onChange}
          className={isStatic ? `form-control ${styles['static']}` : 'form-control'}
          >
          {(defaultOption)
            ? <option>{defaultOption}</option>
            : null
          }
          {options.map((option,i) => {
            return <option key={i} value={option}>{option}</option>;
          })
          }
          </select>
        }
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default SelectInput;