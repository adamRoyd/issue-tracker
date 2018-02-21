import React from 'react';
import PropTypes from 'prop-types';

const StatusIcon = ({ imageCssClass, height, width, type }) => {
  										switch (type) {
    case 'New':
      										return <svg height={height} width={width} className={imageCssClass} viewBox="0 0 100 100"><g transform="translate(10,-952.36218)"><path d="M 50,967.36218 62.33231,989.17447 87,994.0998 69.9541,1012.5059 72.86726,1037.3622 50,1026.9255 27.13275,1037.3622 30.04591,1012.5059 13,994.0998 37.66769,989.17447 z" /></g></svg>;
    case 'On Hold':
      										return <svg height={height} width={width} className={imageCssClass} viewBox="-7 -12 110 123"><g transform="translate(12,0)"><path d="M50,5.2C25.3,5.2,5.2,25.3,5.2,50s20,44.8,44.8,44.8s44.8-20,44.8-44.8S74.7,5.2,50,5.2z M50,87.3   c-20.5,0-37.3-16.8-37.3-37.3S29.5,12.7,50,12.7S87.3,29.5,87.3,50S70.5,87.3,50,87.3z" /><path d="M40.1,30.1c-2.1,0-3.7,1.6-3.7,3.7v32.3c0,2.1,1.6,3.7,3.7,3.7c2.1,0,3.7-1.6,3.7-3.7V33.8   C43.8,31.7,42.2,30.1,40.1,30.1z" /><path d="M59.9,30.1c-2.1,0-3.7,1.6-3.7,3.7v32.3c0,2.1,1.6,3.7,3.7,3.7c2.1,0,3.7-1.6,3.7-3.7V33.8   C63.7,31.7,62.1,30.1,59.9,30.1z" /></g></svg>;
    case 'Ready To Fix':
      										return <svg height={height} width={width} className={imageCssClass} ><g transform="translate(-24 -140)"><path d="M36.166,141.922l2.346,2.348c1.172,1.17,1.172,3.07,0,4.242c-1.172,1.172-3.071,1.172-4.242,0   l-2.346-2.346c-0.876,2.465-0.335,5.322,1.639,7.295c1.973,1.973,4.829,2.514,7.295,1.639l12.504,12.504   c1.171,1.172,3.071,1.172,4.242,0c1.172-1.172,1.172-3.072,0-4.242l-12.503-12.504c0.875-2.467,0.334-5.322-1.639-7.297   C41.488,141.588,38.632,141.047,36.166,141.922z M56.189,166.189c-0.586,0.586-1.535,0.586-2.121,0   c-0.586-0.586-0.586-1.537,0-2.121c0.585-0.586,1.535-0.586,2.121,0C56.775,164.652,56.775,165.604,56.189,166.189z" /></g></svg>;
    case 'Fixed':
      										return <svg height={height} width={width} className={imageCssClass} viewBox="0 -20 100 120" enableBackground="new 0 0 100 100"><g transform="translate(11,0)"><polygon points="44.8,82.8 13.2,59.4 19.8,50.6 42.2,67.2 79,13.9 88,20.1 " /></g></svg>;
    case 'Returned':
      										return <svg height={height} width={width} className={imageCssClass} viewBox="0 -7 100 104" enableBackground="new 0 0 100 100"><g transform="translate(11,-952.36218)"><path d="m 40.000001,975.36217 -31.9999995,25.00003 31.9999995,25 0,-12 c 1.7024,-0.08 31.377101,-2.0334 51.999998,16 -8.252997,-25.4273 -34.173798,-37.4872 -51.999998,-42.00003 z" /></g></svg>;
    case 'Closed':
      										return <svg height={height} width={width} className={imageCssClass} viewBox="0 -19 100 113"><g transform="translate(12,0)"><path d="M50,13.24l29,7.24a.24.24,0,0,1,.19.24V61.2a.24.24,0,0,1-.08.18l-29,25.55a.24.24,0,0,1-.32,0l-29-25.55a.24.24,0,0,1-.08-.18V20.72a.24.24,0,0,1,.19-.24l29-7.24M50,5,19,12.72a8.24,8.24,0,0,0-6.25,8V61.2a8.24,8.24,0,0,0,2.79,6.18l29,25.55a8.24,8.24,0,0,0,10.9,0l29-25.55a8.24,8.24,0,0,0,2.79-6.18V20.72a8.24,8.24,0,0,0-6.25-8L50,5Z"></path><g><polygon points="72.5 37.21 44.63 65.08 27.5 47.95 33.73 41.72 44.63 52.62 66.27 30.98 72.5 37.21"></polygon><polygon points="72.5 37.21 44.63 65.08 27.5 47.95 33.73 41.72 44.63 52.62 66.27 30.98 72.5 37.21"></polygon></g></g></svg>;
    case 'Rejected':
      										return <svg height={height} width={width} className={imageCssClass} viewBox="0 0 90 90" enableBackground="new 0 0 100 100"><g transform="translate(3 0)"><path d="M70,66.2c1.1,1.1,1.1,2.9,0,4c-1.1,1.1-2.9,1.1-4,0l-16-16l-16,16c-1.1,1.1-2.9,1.1-4,0c-1.1-1.1-1.1-2.9,0-4l16.1-16.1  L30,34c-1.1-1.1-1.1-2.9,0-4c1.1-1.1,2.9-1.1,4,0l16,16l16-16c1.1-1.1,2.9-1.1,4,0c1.1,1.1,1.1,2.9,0,4L53.9,50.1L70,66.2z" /></g></svg>;
    case 'All':
      										return <svg height={height} width={width} className={imageCssClass} viewBox="0 0 100 125" enableBackground="new 0 0 100 100"><g transform="translate(13 20)"><path d="M50,5.2C25.3,5.2,5.2,25.3,5.2,50s20,44.8,44.8,44.8s44.8-20,44.8-44.8S74.7,5.2,50,5.2z M50,87.3   c-20.5,0-37.3-16.8-37.3-37.3S29.5,12.7,50,12.7S87.3,29.5,87.3,50S70.5,87.3,50,87.3z" /></g></svg>;
    case 'Brightwave':
      										return (<svg height={height} width={width} className={imageCssClass} viewBox="11 5 40 50" enableBackground="new 0 0 100 100"><g><g><path d="M160.9,52.8h3v4.3c-0.5,0.1-0.9,0.3-1.4,0.3c-0.5,0.1-1,0.1-1.7,0.1c-1.3,0-2.4-0.4-3.1-1.2c-0.7-0.8-1.1-1.9-1.1-3.4c0-0.9,0.2-1.7,0.6-2.4c0.4-0.7,0.9-1.2,1.6-1.6c0.7-0.4,1.5-0.5,2.5-0.5c0.9,0,1.8,0.2,2.7,0.5l-0.4,0.9c-0.8-0.3-1.6-0.5-2.3-0.5c-1.1,0-1.9,0.3-2.5,1c-0.6,0.6-0.9,1.5-0.9,2.7c0,1.2,0.3,2.1,0.9,2.7c0.6,0.6,1.4,0.9,2.6,0.9c0.6,0,1.2-0.1,1.8-0.2v-2.7h-2V52.8z" /><path d="M168.3,53.8v3.7h-1v-8.9h2.4c1.1,0,1.9,0.2,2.4,0.6c0.5,0.4,0.8,1,0.8,1.9c0,1.2-0.6,2-1.8,2.4l2.4,4h-1.2l-2.2-3.7H168.3z M168.3,52.9h1.4c0.7,0,1.3-0.1,1.6-0.4c0.3-0.3,0.5-0.7,0.5-1.3c0-0.6-0.2-1-0.5-1.3c-0.3-0.3-0.9-0.4-1.7-0.4h-1.3V52.9z" /><path d="M183.9,53c0,1.4-0.4,2.5-1.1,3.4c-0.7,0.8-1.7,1.2-3,1.2c-1.3,0-2.3-0.4-3-1.2c-0.7-0.8-1.1-1.9-1.1-3.4c0-1.4,0.4-2.6,1.1-3.4c0.7-0.8,1.7-1.2,3-1.2c1.3,0,2.3,0.4,3,1.2C183.6,50.5,183.9,51.6,183.9,53z M176.9,53c0,1.2,0.3,2.1,0.8,2.7c0.5,0.6,1.3,0.9,2.2,0.9c1,0,1.7-0.3,2.2-0.9c0.5-0.6,0.8-1.5,0.8-2.7c0-1.2-0.3-2.1-0.8-2.7c-0.5-0.6-1.2-0.9-2.2-0.9c-1,0-1.7,0.3-2.2,0.9C177.1,50.9,176.9,51.8,176.9,53z" /><path d="M193.9,48.6v5.8c0,1-0.3,1.8-0.9,2.4c-0.6,0.6-1.5,0.9-2.5,0.9c-1.1,0-1.9-0.3-2.5-0.9c-0.6-0.6-0.9-1.4-0.9-2.4v-5.7h1v5.8c0,0.7,0.2,1.3,0.6,1.7c0.4,0.4,1,0.6,1.8,0.6c0.7,0,1.3-0.2,1.7-0.6c0.4-0.4,0.6-1,0.6-1.7v-5.8H193.9z" /><path d="M203.1,51.2c0,0.9-0.3,1.6-0.9,2.1c-0.6,0.5-1.5,0.7-2.6,0.7h-1v3.5h-1v-8.9h2.3C202,48.6,203.1,49.5,203.1,51.2z M198.5,53.1h0.9c0.9,0,1.6-0.1,2-0.4c0.4-0.3,0.6-0.8,0.6-1.4c0-0.6-0.2-1-0.6-1.3c-0.4-0.3-1-0.4-1.8-0.4h-1.2V53.1z" /></g><g ><path d="M24.7,28.5c3.9-3.8,8.7,1.1,10.3,2.4c1.5,1.2,5.8,4.6,10.4,0.9v0c0-5.5-4.3-12.7-12.8-12.7c-8,0-12.5-1.2-15-2.4c-1.1-0.5-2.3,0.4-2,1.6c1.1,4.9,2.2,9,3.2,12.4C19.3,31.1,21.1,32.1,24.7,28.5" /><path d="M39.6,37c-3.4-0.1-8.2-5.1-8.7-5.6c-0.6-0.5-3.1-3.1-6.2-0.8c-3.4,2.6-5.3,0.8-5.8,0.2c1.4,4.4,2.8,7.5,4.6,9.7c2.9,3.4,6.6,4.5,9.4,4.5c6.8,0,12.6-5.3,12.7-13C45.1,32.8,43,37.1,39.6,37" /></g>
            </g></svg>);
    default:
      										return <svg height={height} width={width} className={imageCssClass} viewBox="0 0 100 125" enableBackground="new 0 0 100 100"><polygon points="4.8,82.8 13.2,59.4 1.8,50.6 42.2,6.2 79,13.9 8,20.1 " /></svg>;
  }
};

StatusIcon.propTypes = {
  										imageCssClass: PropTypes.string,
  										height: PropTypes.string.isRequired,
  										width: PropTypes.string.isRequired,
  										type: PropTypes.string.isRequired,
};

export default StatusIcon;
