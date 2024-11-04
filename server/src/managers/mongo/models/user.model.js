import mongoose from "mongoose";

const collection = "Users";
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Role",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const userModel = mongoose.model(collection, schema);

export default userModel;

/* 
Luego: repasar para implementar la relación entre usuarios y productos si los hubiera
   type: mongoose.Schema.Types.ObjectId,
   unique:true,
   index:true,
   ref: 'Products',
   Incorporar: Date.now
*/

/* 
Populate: 
   schema.pre(['find','findOne'], function(){
	 this.populate('cartId')
   })
*/
