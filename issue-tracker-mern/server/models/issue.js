import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    project: { 
        type : 'String',
        lowercase: true,
        required: true
    },
    id: { type: 'Number', required: true },
    sco: { type: 'Number', required: true },
    screen: { type: 'Number', required: true },
    location: { 
        type: 'String',
        enum: [
            "Current Screen",
            "Functionality",
            "Global Change",
            "Splash Screen",
            "Menu",
            "Bookmark",
            "Exit",
            "Glossary",
            "Help",
            "Print",
            "Resources"
        ],
        required: true 
    },
    summary: { type: 'String', required: true },
    category: { 
        type: 'String',
        enum: [
            "Screen text",
            "Script",
            "Image",
            "Animation",
            "Audio",
            "Video",
            "Functionality",
            "Global functionality",
            "Global content",
            "Design",
            "Translation"
        ],
        required: true 
    },
    description: { type: 'String', required: true },
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
    assigned: { type: 'String', required: true },
});

export default mongoose.model('Issue', issueSchema);
