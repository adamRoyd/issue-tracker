import React, { PropTypes } from 'react';
import StatusIcon from '../assets/StatusIcon';

const Link = ({ value, onClick }) => {
  return (
       <a 
            href="#" 
            filter={value} 
            className="row"
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
        >
            <StatusIcon height="40" width="40" type={value} imageCssClass="iconWhite"/>
        </a> 
        
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value : PropTypes.string.isRequired
};

export default Link;