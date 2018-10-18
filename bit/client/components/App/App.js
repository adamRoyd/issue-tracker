import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../reducers/UserReducer';
// Import constants
import categories from '../../constants/categories';
import locations from '../../constants/locations';
// Import Components
import NavigationBar from '../Nav/NavigationBar';
import { fetchUser } from '../../actions/UserActions';
// Import Selectors
import { getBatchIssues } from '../../reducers/IssueReducer';
import { getArea } from '../../reducers/AreaReducer';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = { isMounted: false };
    }

    componentDidMount() {
        this.props.dispatch(fetchUser());
        this.setState({ isMounted: true }); // eslint-disable-line
    }


    toggleAddPostSection = () => {
        this.props.dispatch(toggleAddPost());
    };

    render() {
        return (
            <div>
                <NavigationBar {...this.props} />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        user: getUser(state),
        locations,
        categories,
        batchIssues: getBatchIssues(state),
        area: getArea(state),
    };
}

export default connect(mapStateToProps)(App);
