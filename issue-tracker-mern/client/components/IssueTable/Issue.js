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
            <div className={this.props.active ? 'table-row active' : 'table-row'}>
                <div className="column issue-select">
                    <input type="checkbox" checked={issue.checked} onClick={() => checkBoxClick()}/>
                </div>
                <div className="zapper attributes" onClick={() => onClick()}>
                    <div className="zapper title-identifier-location-category-type">
                        <div className="zapper title-identifier">
                            <div className="column id">{issue.id}</div>
                            <div className="column screen">{issue.sco + "_" + issue.screen}</div>
                            <div className="column project">{issue.project}</div>
                        </div>
                        <div className="zapper location-category-type">
                            <div className="column location">{issue.location}</div>
                            <div className="column category">{issue.category}</div>
                            <div className="column type">{issue.type}</div>
                        </div>
                    </div>
                    <div className="zapper description-assigned">
                        <div className="zapper status-owner">
                            <div className="column description">{description}</div>
                            <div className="column assigned">{issue.assigned}</div>
                        </div>
                    </div>
                </div>
            </div>
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