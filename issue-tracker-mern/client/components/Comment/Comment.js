import React from 'react';
import PropTypes from 'prop-types';
import FriendlyDate from '../Common/FriendlyDate';


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
                    <p><strong>{comment.user}<span className="right-align"><FriendlyDate date={comment.time}/></span></strong></p>
                </div>
                <div className="row">
                    <div dangerouslySetInnerHTML={{__html: comment.text}} className="col-sm-7 no-gutter"/>
                    <div className="col-sm-5 no-gutter">
                        <p className="right-align"><strong>{comment.status}</strong></p>
                    </div>
                </div>
            </div>
        );
    }
}

Comment.propTypes = {
    comment : PropTypes.object.isRequired
};

export default Comment;