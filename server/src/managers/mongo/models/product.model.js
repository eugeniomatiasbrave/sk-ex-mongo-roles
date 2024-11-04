import mongoose from 'mongoose';

const collection = "Products"
const schema = new mongoose.Schema({

    code: {
        type:String,
        required:true
    },
	name: {
        type:String,
        required:true
    },
    presentation: {
		type:String,
	    required:true
    },
	price: {
        type: Number,
        required: true,
        min: 0
    } 
});

const productModel = mongoose.model(collection,schema);
export default productModel;