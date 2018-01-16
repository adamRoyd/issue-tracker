import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Issue extends React.Component{
    render(){
        const {issue, onClick, checkBoxClick} = this.props
        //strip html tags from description.
        let description = document.createElement("div");
        description.innerHTML= issue.description;
        description = description.innerText.trim();
        return(
            <tr className={this.props.active ? styles.issueRowActive : styles.issueRow}>
                <td><input type="checkbox" checked={issue.checked} onClick={() => checkBoxClick()}/></td>
                <td onClick={() => onClick()}>{issue.id}</td>
                <td onClick={() => onClick()}>{issue.sco + "_" + issue.screen}</td>
                <td onClick={() => onClick()}>{issue.location}</td>
                <td onClick={() => onClick()}>{issue.category}</td>
                <td onClick={() => onClick()}>{description}</td>
                <td onClick={() => onClick()}>{issue.assigned}</td>
            </tr>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.params.id == ownProps.issue.id
  };
};

Issue.propTypes = {
    onClick : PropTypes.func.isRequired,
    issue : PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Issue);