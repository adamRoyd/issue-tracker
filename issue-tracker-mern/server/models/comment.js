import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    project: {type: 'String', required: true},
    issueId: {type: 'Number',required: true},
    text: { type: 'String', required: true },
    user: { type: 'String', required: true},
    status: { 
    type: 'String', 
    enum:[
        "New",
        "On Hold",
        "Ready To Fix",
        "Fixed",
        "Returned",
        "Closed",
        "Rejected",
        "All"
    ],
    required: true
    },
    time: { type: 'Date', required: true}
})

export default mongoose.model('Comment', commentSchema);
