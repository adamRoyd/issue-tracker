import React, {PropTypes} from 'react';
import styles from './Common.css';

const TextStatic = ({label, value}) => {
  return (
    <div className={"form-group row"}>
      <label className="col-sm-3 col-form-label">{label}</label>
      <div className="col-sm-9 field">
        <div className={`form-control ${styles['static']}`}>{value}</div>
      </div>
    </div>
  );
};

export default TextStatic;