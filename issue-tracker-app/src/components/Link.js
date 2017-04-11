import React, { PropTypes } from 'react';

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
            {value}
        </a> 
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value : PropTypes.object.isRequired
};

export default Link;