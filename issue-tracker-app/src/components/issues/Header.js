import React, { PropTypes } from 'react';

function Header ({onClick,value}) {
    return(
        <th onClick={() => onClick()}>{value}&nbsp;<span className="glyphicon glyphicon-menu-down"/></th>
    );
}

export default Header;