import React, {componentDidMount} from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import CustomMenu from '../common/CustomMenu';
import ProjectPicker from '../common/ProjectPicker';

class SelectProjectPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="wrapper">
                <div className="form-signin">
                    <h4>Select a project to begin</h4>
                    <ProjectPicker {...this.props}/>
                </div>
            </div>
        );
    }  
}


export default SelectProjectPage;