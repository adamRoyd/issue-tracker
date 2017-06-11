import React from 'react';
import PropTypes from 'prop-types';
import StatusIcon from '../../assets/StatusIcon';
import ReactTooltip from 'react-tooltip';

const Link = ({ name, filter, onClick, active, issues, numberOfIssues }) => {
  return (
    <div 
        className={active ? 'linkIconActive' : 'linkIcon'}
        href="#" 
        data-tip data-for={filter}
        data-delay-show="0"
        filter={filter}
        onClick={e => {
            e.preventDefault();
            onClick();
        }}
    >
        <StatusIcon height="35" width="35" type={name} imageCssClass="iconWhite"/>
        <ReactTooltip id={filter} className="potToolTip" offset={{top:0, left:-40}} place="right" effect='solid'>
            <span>{name}</span>
        </ReactTooltip>
        <div id="issueCount">
            <p>{numberOfIssues}</p>
        </div>                
    </div>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  name : PropTypes.string.isRequired,
  filter : PropTypes.string.isRequired
};

export default Link;