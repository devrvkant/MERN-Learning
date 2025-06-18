import Todo from "../models/todos.model.js";

export const createNewTodo = async (req, res) => {
  try {
    const body = req.body;
    const newTodo = await Todo.create(body);
    if (!newTodo) res.status(400).json({ error: "ToDo can't be Empty." });
    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error, Please try again later!" });
  }
};

export const getAllTodoS = async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.status(200).json(allTodos);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error, Please try again later!" });
  }
};

export const getTodoByid = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    if (!todo) res.status(404).json({ error: "ToDo not Found!" });
    res.status(200).json(todo);
  } catch (err) {
    console.error(err.message)
    res
      .status(500)
      .json({ error: "Internal Server Error, Please try again later!" });
  }
};

export const updateTodoById = async(req, res) => {
    try{
        const id = req.params.id;
        const updating = req.body;
        if(!updating) res.status(400).json({error: "No valid updates are Provided."})
        const updatedTodo = await findByIdAndUpdate(id,updating,{new:true});
        if(!updatedTodo) res.status(404).json({error: "ToDo not Found."})
        res.status(200).json(updatedTodo);
    } catch(err){
        console.error(err.message)
    res
      .status(500)
      .json({ error: "Internal Server Error, Please try again later!" });
    }
};

export const deleteTodoById = async(req, res) => {
    try{
        const id = req.params.id;
        const deletedTodo = await Todo.findByIdAndDelete(id)
        if(!deletedTodo) res.status(404).json({error: "ToDo not Found."})
        res.status(200).json(deletedTodo)
    } catch(err){
        console.error(err.message)
    res
      .status(500)
      .json({ error: "Internal Server Error, Please try again later!" });
    }
};
