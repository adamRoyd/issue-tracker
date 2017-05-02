import React, { PropTypes } from 'react';
import StatusIcon from '../../assets/StatusIcon';
import ReactTooltip from 'react-tooltip';

const Link = ({ value, onClick, active }) => {
  return (
        <div>
            <div 
                    href="#" 
                    data-tip={value}
                    data-delay-show="500"
                    filter={value}
                    className={active ? 'linkIconActive' : 'linkIcon'}
                    onClick={e => {
                        e.preventDefault();
                        onClick();
                    }}
                >
                    <StatusIcon height="40" width="40" type={value} imageCssClass="iconWhite"/>
            </div> 
            <ReactTooltip className="potToolTip" offset={{top:0, left:-40}} place="right"/>
        </div>
        
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value : PropTypes.string.isRequired
};

export default Link;