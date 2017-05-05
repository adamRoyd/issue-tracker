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
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">User</label>
                        <p className="col-sm-6"><strong>{this.props.user}</strong></p>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Project</label>
                        <p className="col-sm-6"><strong>{this.props.params.projectCode}</strong></p>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Summary</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Location</label>
                        <div className="col-sm-6">
                            <select ref="" className="form-control">
                                <option>Location</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Sco ID</label>
                        <div className="col-sm-6">
                            <select ref="" className="form-control">
                                <option>Sco ID</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Screen ID</label>
                        <div className="col-sm-6">
                            <select ref="" className="form-control">
                                <option>Screen ID</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Category</label>
                        <div className="col-sm-6">
                            <select ref="" className="form-control">
                                <option>Category</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Assigned</label>
                        <div className="col-sm-6">
                            <select ref="" className="form-control">
                                {this.props.users.map((user,i) =>
                                <option key={i} value={user}>{user}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Description</label> 
                        <div className="col-sm-10">
                            <textarea type="text" className="col-sm-12" rows="5" ref="comment" placeholder="comment"/>
                        </div>                                           
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <input className="btn" type="submit"/>
                            <a>Add attachment</a>
                        </div>
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