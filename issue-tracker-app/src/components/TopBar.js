import React, {PropTypes} from 'react';
import { Link } from 'react-router';

class TopBar extends React.Component{
    render(){
        return(
            <div id="topBar" className="row">
                <div className="col-sm-2">
                    <h4 className="white">ABC123</h4>
                </div>
                <Link to="/selectproject"><button className="btn blue">Open Project</button></Link>
                <button className="btn blue">Batch mode</button>
                <Link to="/abc123/new"><button className="btn">New issue</button></Link>

            </div>
        );
    }
}


export default TopBar;