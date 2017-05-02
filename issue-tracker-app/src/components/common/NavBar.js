import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import { Dropdown, Button } from 'react-bootstrap';
import ProjectPicker from './ProjectPicker';

class NavBar extends React.Component{
    render(){
        const projectCode = this.props.params.projectCode;
        if(projectCode != null){
            return(
                <div id="navBar" className="row">
                    <Link to={`/${projectCode}/issue/All`}>
                        <div className="col-sm-2 projectCode">
                            <h4 className="white">{projectCode.toUpperCase()}</h4>
                        </div>
                    </Link>
                    <Dropdown id="dropdown-custom-menu">
                        <Button className="btn" bsRole="toggle">
                            Open Project
                        </Button>
                        <ProjectPicker bsRole="menu"/>
                    </Dropdown> 
                    <button className="btn">Batch mode</button>
                    <Link to={`/${projectCode}/newissue`}><button className="btn">New issue</button></Link>
                    <Link to={`/login`}><button className="btn">Log out</button></Link>
                    <h4 className="white">{this.props.user}</h4>
                </div>
            );
        }
        else{
            return(
                <div id="navBar" className="row"/>
            );
        }
    }
}

NavBar.propTypes = {
    projectCode : PropTypes.string.isRequired
};


export default NavBar;