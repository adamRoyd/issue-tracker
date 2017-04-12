import React,{PropTypes} from 'react';
import Dropdown from '../common/Dropdown';
import DropZone from 'react-dropzone';

class CommentForm extends React.Component{

    onDrop(files){
        console.log('Recieved files :', files);
        this.setState({
            files: files
        });
    }

    onOpenClick() {
        this.refs.dropzone.open();
    }

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
        this.onOpenClick = this.onOpenClick.bind(this);
        return(
            <div>
                <DropZone ref="dropzone" className="DropZone" activeClassName="DropZoneOver" disableClick={true} onDrop={this.onDrop}>
                    <form className="form-horizontal" ref="commentForm" onSubmit={this.handleSubmit}>
                    
                            <textarea type="text" className="col-sm-7" rows="3" ref="comment" placeholder="comment"/>
                    
                        <div className="col-sm-5">
                            <select ref="assigned" className="form-control">
                                <option value="adam">adam</option>
                            </select>
                            <Dropdown ref="status" options={this.props.status}/>
                        </div>
                        <input className="btn" type="submit"/>  
                        <button id="attach" className="btn" onClick={this.onOpenClick}>Add attachment</button>
                        
                    </form>
               </DropZone>  
                {/*{this.state.files ? 
                    <div>
                        <h2>Uploading {files.length} files...</h2>
                        <div>{this.state.files.map((file) => <img src={file.preview} />)}</div>
                    </div> 
                    : 
                    <p>hi</p>
                }*/}
            </div>
        );
    }
}

CommentForm.propTypes = {
    params : PropTypes.object.isRequired,
    addComment : PropTypes.func.isRequired,
    status : PropTypes.object.isRequired
};

export default CommentForm;