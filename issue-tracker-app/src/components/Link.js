import React, { PropTypes } from 'react';
import StatusIcon from '../assets/StatusIcon';
import ReactTooltip from 'react-tooltip';

const Link = ({ value, onClick, active }) => {
  return (
        <div>
            <div 
                    href="#" 
                    data-tip data-for="happyFace"
                    filter={value}
                    className={active ? 'linkIconActive' : 'linkIcon'}
                    onClick={e => {
                        e.preventDefault();
                        onClick();
                    }}
                >
                    <StatusIcon height="40" width="40" type={value} imageCssClass="iconWhite"/>
            </div> 
            <ReactTooltip id="happyFace">
                <span><p>placeholder</p></span>
            </ReactTooltip>
        </div>
        
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value : PropTypes.string.isRequired
};

export default Link;