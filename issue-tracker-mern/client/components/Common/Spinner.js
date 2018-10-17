import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Spinner = (visible) => {
    let spinclass = '';
    if (visible.visible) {
        spinclass = 'fa fa-spinner fa-pulse fa-2x fa-fw center-position';
    } else {
        spinclass = 'fa fa-spinner fa-pulse fa-2x fa-fw center-position hidden';
    }
    return (
        <i display={false} className={spinclass}></i>
    );
};

export default Spinner;
