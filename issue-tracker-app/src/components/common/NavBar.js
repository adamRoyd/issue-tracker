import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ProjectPicker from './ProjectPicker';

class NavBar extends React.Component{
    render(){
        let projectCode = this.props.params.projectCode;
        if(projectCode == null){projectCode = '';}
            return(
                <div id="navBar" className="row">
                    <Link to={`/${projectCode}/issue/All`}>
                        <div className="col-sm-2 projectCode">
                            <h4 className="white">{projectCode.toUpperCase()}</h4>
                        </div>
                    </Link>
                    <ProjectPicker {...this.props}/>
                    {(projectCode == '')
                        ? <div></div>
                        : <Link to={`/${projectCode}/newissue`}><button className="btn">New issue</button></Link>
                    }
                    <Link to={`/login`}><button className="btn">Log out</button></Link>
                    <h4 className="white">{this.props.user}</h4>
                </div>
            );
        }
    }

NavBar.propTypes = {
    params : PropTypes.object.isRequired,
    user : PropTypes.string.isRequired
};


export default NavBar;