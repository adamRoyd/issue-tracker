import React,{PropTypes} from 'react';
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
        this.props.addComment(id,assigned,comment);
        this.refs.commentForm.reset();
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
                        <textarea type="text" className="col-sm-7" rows="3" ref="comment" placeholder="comment"/>    
                        <div className="col-sm-5">
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
    status : PropTypes.object.isRequired,
    issue : PropTypes.object.isRequired,
    changeStatus : PropTypes.func.isRequired,
    users : PropTypes.object.isRequired
};

export default CommentForm;