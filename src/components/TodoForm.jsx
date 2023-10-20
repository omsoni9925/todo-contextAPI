import React, { useState } from 'react'
import { useTodoContext } from '../context/TodoContext';

function TodoForm() {

  const [todo, setTodo] = useState("") //individual todo

  const { addTodo } = useTodoContext(); //useTodoContext Hook from TodoContext

  //   function addsubmit (e){
  // console.log("called")
  //   }
  const addOnSubmit = (e) => {
    e.preventDefault();

    if (!todo) return

    addTodo({ todo, completed: false }) //Adding Todo with only "completed" change 
    // "todo: todo" in new syntax we can only write todo
    setTodo("")
  }

  return (
    <form onSubmit={addOnSubmit} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
      />
      <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
        Add
      </button>
    </form>
  );
}

export default TodoForm;

