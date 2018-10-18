import React, { PropTypes } from 'react';

const SelectInput = ({ name, label, onChange, value, error, options, defaultOption, isStatic }) => {
    let wrapperClass = 'form-flex';
    if (error && error.length > 0) {
        wrapperClass += ' ' + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <label className="form-label" htmlFor={name}>{label}</label>
            {(isStatic) ?
                <div className="static">{value}</div>
                :
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={isStatic ? 'form-select static' : 'form-select'}
                >
                    {(defaultOption)
                        ? <option>{defaultOption}</option>
                        : null
                    }
                    {options.map((option, i) => {
                        return <option key={i} value={option}>{option}</option>;
                    })
                    }
                </select>
            }
        </div>
    );
};

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default SelectInput;
