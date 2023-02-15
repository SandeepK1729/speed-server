// import model
const userModel = require('../models/userModel');

// create a single user 
//module.exports.createAUser = async function(callBack)
// getting all users
module.exports.getAllUsers = async function(callBack) {
    try {
        var users = await userModel.find({});
        callBack(null, users)
    } catch (err) {
        callBack(err, null);
    }
}

// getting single user
module.exports.getSingleUser = async function(filterQuery, callBack) {
    try {
        var user = await userModel.findOne(filterQuery);
        callBack(null, user);
    } catch (err) {
        callBack(err, null);
    }
}

// delete single user 
// module.exports.deleteSingleUser = async function(filterQuery, callBack) {

// }
// update single user

// createFirstUser
module.exports.createAUser = async function(user, callBack) {
    try {
        var isUserExist = false;
        await this.getSingleUser(user, (err, res) => {
            if (err | !res) {
                callBack(err ? err : "User Already exist", null);
                isUserExist = !res;
            }
        })

        if (!isUserExist) {

            var newUser = new userModel(user);
            var result = await newUser.save();

            callBack(null, result);
        }
    } catch (err) {
        callBack("Error: " + err, null);
    }
}

// create a test user
module.exports.createFirstUser = async function(callBack) {
    var user = {
        username: "Sai Charan",
        yearOfGraduation: 2026,
    }
    this.createAUser(user, callBack);
}