const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const pool = require("./db")  //? pool like mongoose schema here to make query

//middleware
app.use(cors());

app.use(express.json())

//! ROUTES

//* CREATE A TODO

app.post("/todos", async(req, res) => {
    try {
       const {description} = req.body;
       const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", //? RETURNING * - to get res as add todo
        [description]
       )

       res.json(newTodo.rows) //? in res object from db we have rows as data which we added
    } catch (error) {
        console.error(error.message)
    }    
})

//* GET ALL TODO

app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows) //? in res object from db we have rows as data which we added
    } catch (error) {
        console.error(error.message);
        
    }
})

//* GET A TODO

app.get("/todos/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json({data: todo.rows})
    } catch (error) {
        console.error(error.message);
    }
})

//* UPDATE A TODO
app.put("/todos/:id", async(req,res) => {
try {
    const {id} = req.params;
    const {description} = req.body;
    const todo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *", 
        [description, id] //! we also use template literal here but '${var}'  always string
    )
    res.json("todo was updated")
} catch (error) {
    console.error(error.message);
}
} )

//* DELETE A TODO
app.delete("/todos/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
        res.json("todo is deleted")
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(5000, ()=>{
    console.log("server has started on port 5000")
})