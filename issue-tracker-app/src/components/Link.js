import React, { PropTypes } from 'react';
import StatusIcon from '../assets/StatusIcon';

const Link = ({ value, onClick, active }) => {
  return (
       <div 
            href="#" 
            filter={value}
            className={active ? 'linkIconActive' : 'linkIcon'}
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
        >
            <StatusIcon height="40" width="40" type={value} imageCssClass="iconWhite"/>
        </div> 
        
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value : PropTypes.string.isRequired
};

export default Link;