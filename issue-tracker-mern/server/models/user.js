const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);