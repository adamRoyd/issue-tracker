import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const InlineLoader = ({message, className, dark}) => {
    return (
        <div className={classNames('r-inline-loader', dark && 'r-inline-loader-dark', className)}>
            <i className="fa fa-refresh fa-spin fa-3x fa-fw" />
            {
                message && 
                <span>{message}</span>
            }
        </div>
    );
};

InlineLoader.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    dark: PropTypes.bool
};

export default InlineLoader;