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
        var user = await userModel.find(filterQuery);
        if (!user) {
            callBack("User not found", null);
        } else {
            callBack(null, user);
        }

    } catch (err) {
        callBack(err, null);
    }
}

// delete single user 
// module.exports.deleteSingleUser = async function(filterQuery, callBack) {
module.exports.deleteSingleUser = async function(filterQuery, callBack) {
    try {
        let user = await userModel.findOne(filterQuery);

        if (!user) {
            callBack("No user exist with query", null);
            return;
        }

        let modifiedUser = await userModel.findOneAndUpdate(filterQuery, { isDeleted: true }, { new: true });
        callBack(null, modifiedUser);
    } catch (err) {
        callBack(err, null);
    }
};
// }
// update single user
module.exports.updateSingleUser = async function(filterQuery, updatedObject, callBack) {
    try {
        let user = await userModel.findOne(filterQuery);
        if (!user) {
            callBack("No user exist with query", null);
            return;
        }

        let modifiedUser = await userModel.findOneAndUpdate(filterQuery, updatedObject, { new: true });
        callBack(null, modifiedUser);
    } catch (err) {
        callBack(err, null);
    }
};

// createFirstUser
module.exports.createAUser = async function(user, callBack) {
    try {
        let isUserExist = await userModel.findOne(user);

        if (isUserExist) {
            callBack(`User with username ${user.username} Already exist `, null);
        } else {
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