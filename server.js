require('dotenv').config();

const userLib = require("./backend/lib/userLib");
const mongoose = require('mongoose');
const express = require('express');
const todoLib = require('./backend/lib/todoLib');
const app = express();
const port = process.env.PORT || 5050;

const options = {
    extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
    index: ['index.html'],
}
app.use(express.static("frontend"));
const templates = __dirname + '/frontend/html/';
// app.use('/static', express.static('static'));
// app.use('/templates', express.static('templates'));

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

app.get('/', (req, res) => {
    res.send(__dirname);
    // res.send("Hello, Sandeep!");
    // res.sendFile(templates + 'index.html');
});
app.get('/resume', (req, res) => {
    res.sendFile(templates + 'resume.html');
});
app.get('/card', (req, res) => {
    res.sendFile(__dirname + '/frontend/html/card.html');
});
app.get('/getAllUsers', (req, res) => {
    userLib.getAllUsers((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    })
});
app.post('/createUser', (req, res) => {
    userLib.createAUser(req.body, (err, result) => {
        if (err) res.send(err);
        else res.json(result);
    });
});
app.post('/deleteUser', (req, res) => {
    console.log("My dear user : " + req.body.username);
    userLib.deleteSingleUser(req.body, (err, result) => {
        console.log(err);
        res.send(err ? err : result);
    })
});
app.post('/updateUser', (req, res) => {
    userLib.updateSingleUser(req.body.filterQuery, req.body.updatedObject, (err, result) => {
        res.send(err ? err : result);
    })
});
app.use('/weather', (req, res) => {
    res.sendFile(__dirname + "/frontend/html/weather.html")
})


// todo app api's
app.get('/api/todos', (req, res) => {
    todoLib.getAllTodos((err, result) => {
        if (err)
            res.json({
                status: "error",
                message: err,
                data: null
            });
        else
            res.json({
                status: "success",
                data: result
            });
    })
});
// create todo app api's
app.post('/api/todos', (req, res) => {
    todoLib.createTodo(req.body, (err, result) => {
        if (err)
            res.json({
                status: "error",
                message: err,
                data: null
            });
        else
            res.json({
                status: "success",
                data: result
            });
    })
});
// update by id 
app.put('/api/todos/:todoId', (req, res) => {
    todoLib.updateTodoById(req.params.todoId, req.body, (err, result) => {
        if (err)
            res.json({
                status: "error",
                message: err,
                data: null
            });
        else
            res.json({
                status: "success",
                data: result
            });
    });
});

// delte by id
app.delete('/api/todos/:todoId', (req, res) => {
    todoLib.deleteTodoById(req.params.todoId, (err, result) => {
        if (err)
            res.json({
                status: "error",
                message: err,
                data: null
            });
        else
            res.json({
                status: "success",
                data: result
            });
    });
});

// get todo by id
app.get('/api/todos/id', (req, res) => {
    todoLib.getAllTodos((err, result) => {
        res.send(err ? err : result);
    });
});
app.get('/api/getTodosByQuery', (req, res) => {
    todoLib.getTodosByQuery(req.body, (err, result) => {
        res.send(err ? err : result);
    });
});
app.get('/api/getTodosById', (req, res) => {

});
app.get('/api/updateTodoById', (req, res) => {
    todoLib.updateTodoById(
        req.body.todoId,
        req.body,
        (err, result) => {
            res.send(err ? err : result);
        });
});
app.post('/api/deleteTodoById', (req, res) => {
    todoLib.deleteTodoById(req.query.todoId, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
})

// todo app 
app.use('/todos', (req, res) => {
    res.sendFile(__dirname + '/frontend/html/todo.html');
});



mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.MONGO_CONNECTION_STRING, {}, (err) => {
        if (err) {
            console.error(err);
            return;
        } // else {
        console.log("Database Connected");

        // do not create user if already exist

        // userLib.getSingleUser({ username: "Sandeep1729" })
        // connecting server with port
        app.listen(port, () => {
            console.log(`Server Running on http://localhost:${port}`);
        });
        // }
    }
);