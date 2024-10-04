import usersModel from "./models/user.model.js";

export default class UserMangers {

    getUsers(){
        return usersModel.find();
    }

    getUserById(userId){
        return usersModel.findOne(userId)
    }
   
    getUserByEmail(email){
        return usersModel.findOne({email});
    }
  
    createUser(user){
        return usersModel.create(user);
    }
}