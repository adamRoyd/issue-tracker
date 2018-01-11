import React from 'react';
import PropTypes from 'prop-types';
import styles from './IssueTable.css';

function Header ({onClick,header}) {
    return(
        <th onClick={() => onClick()}>
            {header.name}
            &nbsp;
            <span 
            className={(header.filter == 0) 
                ? `glyphicon glyphicon-minus ${styles.white}` 
                : (
                    (header.filter == 1) 
                    ? "glyphicon glyphicon-menu-down" 
                    : "glyphicon glyphicon-menu-up")}
            />
        </th>
    );
}

Header.propTypes = {
    header : PropTypes.object.isRequired,
    onClick : PropTypes.func.isRequired
};

export default Header;