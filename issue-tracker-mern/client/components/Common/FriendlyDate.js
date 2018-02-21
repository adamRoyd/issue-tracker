import React, { Component } from 'react';
import PropTypes from 'prop-types';

const FriendlyDate = ({ date }) => {
    const d = new Date(date);
    const day = checkZero(d.getDate());
    const month = checkZero(d.getMonth() + 1);
    const year = d.getFullYear();
    const hour = checkZero(d.getHours());
    const minutes = checkZero(d.getMinutes());
    const dateText = day + '/' + month + '/' + year + ' ' + hour + ':' + minutes;
    function checkZero(data) {
        if (data < 10) {
            data = '0' + data;
        }
        return data;
    }
    return (
        <span>{dateText}</span>
    );
};

export default FriendlyDate;
