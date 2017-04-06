import React,{PropTypes} from 'react';

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
                <form ref="commentForm" onSubmit={this.handleSubmit}>
                    <input type="text" ref="author" placeholder="author"/>
                    <input type="text" ref="comment" placeholder="comment"/>      
                    <input type="submit"/>                 
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