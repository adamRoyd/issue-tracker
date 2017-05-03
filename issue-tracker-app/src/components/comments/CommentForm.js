import React from 'react';
import PropTypes from 'prop-types';
import DropZone from 'react-dropzone';

class CommentForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {selectValue: this.props.issue.status};
    }
    onDrop(files){
        this.setState({
            files: files
        });
    }
    onOpenClick() {
        this.refs.dropzone.open();
    }
    handleSubmit(e){
        e.preventDefault();
        const {id} = this.props.params;
        const assigned = this.refs.assigned.value;
        const comment = this.refs.comment.value;
        const status = this.refs.status.value;
        const time = this.getDateTime(); 
        this.props.addComment(id,this.props.user,comment,time);
        this.props.saveIssue(id,status,assigned);
        this.refs.commentForm.reset();
    }
    getDateTime(){
        const d = new Date();
        const curr_date = d.getDate();
        const curr_month = d.getMonth();
        const curr_year = d.getFullYear();
        return (curr_date + "-" + curr_month + "-" + curr_year);
    }
    handleStatusChange(e){
        const status = e.target.value;
        this.setState({selectValue: event.target.value});
    }
    render(){
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onOpenClick = this.onOpenClick.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        return(
            <div>
                <DropZone ref="dropzone" className="DropZone" activeClassName="DropZoneOver" disableClick={true} onDrop={this.onDrop}>
                    <form className="form-horizontal" ref="commentForm" onSubmit={this.handleSubmit}>
                        <textarea type="text" className="col-sm-8" rows="3" ref="comment" placeholder="comment"/>
                        <div className="col-sm-4">
                            <select ref="assigned" className="form-control">
                                {this.props.users.map((user,i) =>
                                <option key={i} value={user}>{user}</option>
                                )}
                            </select>
                            <select ref="status" className="form-control" value={this.state.selectValue} onChange={this.handleStatusChange}>  
                                {this.props.status.map((option, i) =>
                                <option key={i} value={option}>{option}</option>
                                )}
                            </select>
                        </div>
                        <input className="btn" type="submit"/>  
                        <button id="attach" className="btn" onClick={this.onOpenClick}>Add attachment</button>     
                    </form>

               </DropZone>  
            </div>
        );
    }
}

CommentForm.propTypes = {
    params : PropTypes.object.isRequired,
    addComment : PropTypes.func.isRequired,
    status : PropTypes.array.isRequired,
    issue : PropTypes.object.isRequired,
    changeStatus : PropTypes.func.isRequired,
    users : PropTypes.array.isRequired,
    saveIssue : PropTypes.func.isRequired,
    user : PropTypes.string.isRequired
};



export default CommentForm;