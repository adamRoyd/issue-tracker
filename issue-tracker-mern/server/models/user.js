import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String
})


export default mongoose.model('User',userSchema);