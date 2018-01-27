import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectCode: { type: 'String' }
})

export default mongoose.model('Project', projectSchema);