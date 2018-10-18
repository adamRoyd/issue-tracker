import React from 'react';
import PropTypes from 'prop-types';
import FilterLink from './FilterLink';

class IssuePots extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const containerStyle = this.props.params.area == 'new' ? 'issue-pots hidden' : 'issue-pots visible-desktop';
        return (
            <div className={containerStyle}>
                {this.props.status.map((pot, i) =>
                    <FilterLink
                        projectCode={this.props.projectCode}
                        key={i} name={pot.name}
                        filter={pot.filter}
                        area={this.props.area}
                    />
                )}
            </div>
        );
    }
}

IssuePots.propTypes = {
    status: PropTypes.array.isRequired,
    projectCode: PropTypes.string.isRequired,
};

export default IssuePots;
