import React, {PropTypes} from 'react';

const TrophyImage = ({imageCssClass, height, width}) => {
    return (
        
        <svg x="0px" y="0px" height={height} width={width} viewBox="0 0 50 50" >
            <g>
                <path className={imageCssClass} d="
	M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
	/>
            </g>
        </svg>

  );
};
 
TrophyImage.propTypes = {        
    imageCssClass: PropTypes.string,
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
};
 
export default TrophyImage;