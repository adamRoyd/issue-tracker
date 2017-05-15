import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    id: { type: 'Number', required: true },
    sco: { type: 'Number', required: true },
    screen: { type: 'Number', required: true },
    location: { type: 'String', required: true },
    summary: { type: 'String', required: true },
    category: { type: 'String', required: true },
    description: { type: 'String', required: true },
    status: { type: 'String', required: true },
    assigned: { type: 'String', required: true },
});

export default mongoose.model('Issue', issueSchema);
