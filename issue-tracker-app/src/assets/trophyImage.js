import React, {PropTypes} from 'react';

const TrophyImage = ({imageCssClass, height, width}) => {
    return (
        
        <svg height={height} width={width} className={imageCssClass} viewBox="0 0 100 125" enable-background="new 0 0 100 100"><polygon points="44.8,82.8 13.2,59.4 19.8,50.6 42.2,67.2 79,13.9 88,20.1 "/></svg>

  );
};
 
TrophyImage.propTypes = {        
    imageCssClass: PropTypes.string,
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
};
 
export default TrophyImage;