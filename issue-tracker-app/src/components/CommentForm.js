import React,{PropTypes} from 'react';
import Dropdown from '../common/Dropdown';

class CommentForm extends React.Component{

    handleSubmit(e){
        e.preventDefault();
        //create structure of comment object
        const {id} = this.props.params;
        const author = this.refs.author.value;
        const comment = this.refs.comment.value;
        this.props.addComment(id,author,comment);
        this.refs.commentForm.reset();
    }
    render(){
        this.handleSubmit = this.handleSubmit.bind(this);
        return(
            <div>
                <form className="form-horizontal" ref="commentForm" onSubmit={this.handleSubmit}>
                    <textarea type="text" className="col-sm-7" rows="3" ref="comment" placeholder="comment"/>
                    <div className="col-sm-5">
                        <select ref="assigned" className="form-control">
                            <option value="adam">adam</option>
                        </select>
                        <Dropdown ref="status" options={this.props.status}/>
                    </div>
                    <input className="btn" type="submit"/>  
                    {/*<input className="" type="text" ref="author" placeholder="author"/>*/}
                </form>
                
            </div>
        );
    }
}

CommentForm.propTypes = {
    params : PropTypes.object.isRequired,
    addComment : PropTypes.func.isRequired
};

export default CommentForm;