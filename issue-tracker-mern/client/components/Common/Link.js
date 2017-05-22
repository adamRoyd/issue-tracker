import React from 'react';
import PropTypes from 'prop-types';
import StatusIcon from '../../assets/StatusIcon';
import ReactTooltip from 'react-tooltip';

const Link = ({ value, onClick, active, issues }) => {
  return (
        <div className={active ? 'linkIconActive' : 'linkIcon'}>
            <div 
                href="#" 
                data-tip data-for={value}
                data-delay-show="0"
                filter={value}
                onClick={e => {
                    e.preventDefault();
                    onClick();
                }}
            >
                <StatusIcon height="35" width="35" type={value} imageCssClass="iconWhite"/>
                <ReactTooltip id={value} className="potToolTip" offset={{top:0, left:-40}} place="right" effect='solid'>
                    <span>{value}</span>
                </ReactTooltip>
            </div>
            <div id="issueCount">
                {issues.filter(t =>t.status == value).length}
            </div>
        </div>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value : PropTypes.string.isRequired
};

export default Link;