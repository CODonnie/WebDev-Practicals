import mongoose from "mongoose";

const connectDB = async() => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI)
	console.log(`database connected - ${conn.connection.host}`)
	} catch(e){
		console.log(`database connection error - ${e}`);
		process.exit(1)
	}
}

export default connectDB;
