import React, { PropTypes } from 'react';

function Header ({onClick,value}) {
    return(
        <th onClick={() => onClick()}>{value}</th>
    );
}

export default Header;