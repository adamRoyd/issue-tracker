import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Spinner = (visible) => {
    let v;
    if(!visible.visible){
        v = "hidden"
    }   else{
        v = ""
    }
    const spinclass = "fa fa-spinner fa-pulse fa-2x fa-fw float-left " + v
    return(
        <i display={false} className={spinclass}></i>
    );
}

export default Spinner;