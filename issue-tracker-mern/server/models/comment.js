import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: { type: 'String', required: true },
    user: { type: 'String', required: true},
    time: { type: 'String', required: true}
})

export default mongoose.model('Comment', commentSchema);
