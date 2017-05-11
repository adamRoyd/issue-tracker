import React, {componentWillReceiveProps,componentWillUpdate} from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import CustomMenu from '../common/CustomMenu';
import ProjectPicker from '../common/ProjectPicker';

class SelectProjectPage extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(value){
        const projectCode = value.toLowerCase();
        browserHistory.push(`/${projectCode}/issue/All/`);
        //TO DO load issues
    }
    render(){
        return(
            <div className="wrapper">
                <div className="form-signin">
                    <h4>Select a project to begin</h4>
                    <div className="project-list">
                        <ul className="list-group">
                        {this.props.projects.map((value, i) =>
                            <button type="button" className="list-group-item" key={i} onClick={() => this.handleClick(value)}>{value}</button>
                        )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }  
}


export default SelectProjectPage;