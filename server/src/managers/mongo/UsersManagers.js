import usersModel from "./models/user.model.js";

export default class UserMangers {

    getUsers(){
        return usersModel.find();
    }

    getUserById(userId){
        return usersModel.findOne({ _id: userId })
    }
   
    getUserByEmail(email){
        return usersModel.findOne({email}).populate("roles");
    }
  
    createUser(user){
        return usersModel.create(user);
    }

    updateUser(userId, updateData) {
        return usersModel.updateOne({ _id: userId }, { $set: updateData });
    }
}