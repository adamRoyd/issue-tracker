const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: String,
    usertype: {
        type: 'String',
        enum: [
            'Client',
            'Internal',
            'Admin',
        ],
        required: true,
    },
    project: {
        type: 'String',
    },
    resetPasswordToken: String,
    resetPasswordExpires : Date
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
