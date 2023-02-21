// importing model
const todoModel = require('../models/todoModel');

// adding functionalities
module.exports.createTodo = async function(task, callBack) {
    try {
        let isTodoExist = await todoModel.findOne(task);
        if (isTodoExist) {
            callBack(`task already exist`, null);
        } else {
            let newTodo = new todoModel(task);
            let res = await newTodo.save();
            callBack(null, res);
        }
    } catch (err) {
        callBack(err, null);
    }
};

// getting all todos
module.exports.getAllTodos = async function(callBack) {
    try {
        var res = await todoModel.find({});
        callBack(null, res);
    } catch (err) {
        callBack(err, null);
    }
}

// getting todos by query
module.exports.getTodosByQuery = async function(query, callBack) {
    try {
        var res = await todoModel.find(query);
        callBack(null, res);
    } catch (err) {
        callBack(err, null);
    }
}

//getting single todo by id
module.exports.getTodosById = async function(id, callBack) {
    try {
        var res = await todoModel.find({
            _id: mongoose.Types.ObjectId(id)
        });
        callBack(null, res);
    } catch (err) {
        callBack(err, null);
    }
}

// update the todo by id 
module.exports.updateTodoById = async function(id, updateQuery, callBack) {
    try {
        var todo = await todoModel.find({
            _id: id // mongoose.Types.ObjectId(id)
        });

        if (!todo) {
            callBack(`todo with ${id} not exist`, null);
        } else {
            var res = await todoModel.findOneAndUpdate({ _id: id }, updateQuery, { new: true });
            callBack(null, res);
        }
    } catch (err) {
        callBack(err, null);
    }
}

// delete a todo by id 
module.exports.deleteTodoById = async function(id, callBack) {
    try {
        var todo = await todoModel.find({ _id: id });
        if (!todo) {
            callBack(`todo with ${id} not exist`);
        } else {
            var res = await todoModel.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
            callBack(null, res);
        }
    } catch (err) {
        callBack(err, null);
    }
}