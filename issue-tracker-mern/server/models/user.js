import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import md5 from 'md5';
import validator from 'validator';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import passportLocalMongoose from 'password-local-mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Please supply an email address'
    }
})

userSchema.plugin(passportLocalMongoose, {userNameField: 'email'});
userSchema.plugin(mongodbErrorHandler);

export default mongoose.model('User',userSchema);