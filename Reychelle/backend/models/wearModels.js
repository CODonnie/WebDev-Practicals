import mongoose from 'mongoose';


const wearSchema = new mongoose.Schema({
	name: {type: String, require: true},
	price: {type: Number, require: true},
	description: {type: String, require: true},
	category: {type: String, require: true},
	discount: {type: Number},
	image: [{type: String, require: true}],
})

const wearsModel = mongoose.model.wears || mongoose.model('wears', wearSchema);

export default wearsModel;
