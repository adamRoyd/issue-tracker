import React from 'react';

const TextStatic = ({ label, value }) => {
    return (
        <div className="form-flex">
            <label className="form-label">{label}</label>
            <div className="field">
                <div className="static">{value}</div>
            </div>
        </div>
    );
};

export default TextStatic;
