import React, { PropTypes } from 'react';

function Header ({onClick,header}) {
    return(
        <th onClick={() => onClick()}>
            {header.name}
            &nbsp;
            <span className={(header.filter == 0) ? "" : "glyphicon glyphicon-menu-down"}/>
        </th>
    );
}

export default Header;