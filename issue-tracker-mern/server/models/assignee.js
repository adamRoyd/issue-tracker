import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const assigneeSchema = new Schema({
    assignee: {type: 'String',required: true}
})

export default mongoose.model('Assignee',assigneeSchema);