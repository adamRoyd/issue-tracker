import React from 'react';
import PropTypes from 'prop-types';



class Comment extends React.Component{

    render(){
        //date formatting
        const {comment} = this.props;
        const d = new Date(comment.time);
        const day = checkZero(d.getDay());
        const month = checkZero(d.getMonth() + 1);
        const year = d.getFullYear();
        const hour = checkZero(d.getHours());
        const minutes = checkZero(d.getMinutes());
        const dateText = day + "/" + month + "/" + year + " " + hour + ":" + minutes;

        function checkZero(data){
            if(data < 10){
                data = "0" + data;
            }
            return data;
        }

        return(
            <div className="comment">
                <div className="row">
                    <div className="col-sm-12">
                        <p><strong>{comment.user}<span className="commentDate">{dateText}</span></strong></p>
                    </div>
                </div>
                <div className="row">
                    <div dangerouslySetInnerHTML={{__html: comment.text}} className="col-sm-12"/>
                </div>
            </div>
        );
    }
}

Comment.propTypes = {
    comment : PropTypes.object.isRequired
};

export default Comment;