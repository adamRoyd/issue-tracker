import React, { PropTypes } from 'react';

const TextInput = ({ name, label, onChange, placeholder, value, error, isStatic }) => {
    let wrapperClass = 'form-flex';
    if (error && error.length > 0) {
        wrapperClass += ' ' + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <label className="form-label" htmlFor={name}>{label}</label>
            {(!isStatic)
                ?
                <input
                    type="text"
                    name={name}
                    className="form-select"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                :
                <div className="field">
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
    error: PropTypes.string,
};

export default TextInput;
