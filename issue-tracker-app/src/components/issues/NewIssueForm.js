import React from 'react';
import PropTypes from 'prop-types';

class NewIssueForm extends React.Component{
    constructor(props){
        super(props);
    }
    handleSubmit(e){
        e.preventDefault();
    }
    render(){
        return(
            <div>
                <h4>New Issue</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-4">
                            <p className="form-control-static">email@example.com</p>
                        </div>
                        <label className="col-sm-2 col-form-label">Location</label>
                        <div className="col-sm-4">
                            <select ref="" className="form-control">
                                <option>Location</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Sco ID</label>
                        <div className="col-sm-4">
                            <select ref="" className="form-control">
                                <option>Sco ID</option>
                            </select>
                        </div>
                        <label className="col-sm-2 col-form-label">Screen ID</label>
                        <div className="col-sm-4">
                            <select ref="" className="form-control">
                                <option>Screen ID</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Category</label>
                        <div className="col-sm-4">
                            <select ref="" className="form-control">
                                <option>Category</option>
                            </select>
                        </div>
                        <label className="col-sm-2 col-form-label">Assigned</label>
                        <div className="col-sm-4">
                            <select ref="" className="form-control">
                                {this.props.users.map((user,i) =>
                                <option key={i} value={user}>{user}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">Issue description</label>                    
                    </div>
                    <div className="form-group row">
                        <textarea type="text" className="col-sm-12" rows="5" ref="comment" placeholder="comment"/>
                    </div>
                    <div className="form-group row">
                        <input className="btn" type="submit"/>
                        <a>Add attachment</a>
                    </div>
                    
                </form>
            </div>
        );
    }
}

NewIssueForm.propTypes = {
    users : PropTypes.array.isRequired
};

export default NewIssueForm;