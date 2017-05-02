import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as commentActions from '../../actions/commentActions';
import CommentForm from './CommentForm';

function mapStateToProps(state){
    return{

    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(commentActions, dispatch);
}

const CommentManager = connect(mapStateToProps,mapDispatchToProps)(CommentForm);

export default CommentManager;