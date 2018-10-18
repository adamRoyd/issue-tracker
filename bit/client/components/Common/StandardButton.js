import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InlineLoader from './InlineLoader';
import classNames from 'classnames';

class StandardButton extends Component {
    constructor(props) {
        super(props);
        this.buttonRef = this.buttonRef.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    buttonRef(button) {
        this.button = button;
    }

    onClick() {
        // Get rid of rollover/focus state otherwise horizontal white line stays put.
        if (this.button) {
            this.button.blur();
        }

        this.props.onClick();
    }

    render() {
        const baseClass = (this.props.isNegative) ? 'hvr-underline-from-center-negative' : 'hvr-underline-from-center';

        const buttonClass = classNames(
            this.props.className || 'r-button',
            this.props.isWorking || this.props.isDisabled && !this.props.isNegative ? null : baseClass,
            this.props.isWorking || this.props.isDisabled ? 'r-button-disabled' : null);

        const OuterElement = this.props.linkUrl ? Link : Button;

        return (
            <OuterElement className={buttonClass} linkUrl={this.props.linkUrl} onClick={this.onClick} title={this.props.title} isWorking={this.props.isWorking} buttonRef={this.buttonRef}>
                {this.props.icon}
                {this.props.text}
            </OuterElement>
        );
    }
}

StandardButton.propTypes = {
    icon: PropTypes.element,
    isDisabled: PropTypes.bool,
    isNegative: PropTypes.bool,
    isWorking: PropTypes.bool,
    linkUrl: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    title: PropTypes.string,
};

StandardButton.defaultProps = {
    isDisabled: false,
};

export default StandardButton;

const Link = props => {
    return (
        <a href={props.linkUrl} className={props.className} title={props.title}>
            {props.isWorking ? <InlineLoader /> : props.children}
        </a>);
};

const Button = props => {
    return (
        <button type="button" className={props.className}
            onClick={props.onClick} ref={props.buttonRef}
        >
            {props.isWorking ? <InlineLoader /> : props.children}
        </button>);
};
