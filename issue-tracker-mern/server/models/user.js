const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true
	},
	password: String,
	isClient: Boolean
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);