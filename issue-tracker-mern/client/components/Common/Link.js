import React from 'react';
import PropTypes from 'prop-types';
import StatusIcon from '../../assets/StatusIcon';
import ReactTooltip from 'react-tooltip';

const Link = ({ value, onClick, active, issues }) => {
  return (
        <div className={active ? 'linkIconActive' : 'linkIcon'}>
            <div 
                href="#" 
                data-tip={value}
                data-delay-show="500"
                filter={value}
                onClick={e => {
                    e.preventDefault();
                    onClick();
                }}
            >
                <StatusIcon height="40" width="40" type={value} imageCssClass="iconWhite"/>
                <ReactTooltip className="potToolTip" offset={{top:0, left:-40}} place="right"/>
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