import { useEffect, useState } from 'react'
import { TodoProvider } from './context/TodoContext'
import { TodoForm, TodoItem } from './components/index';

function App() {

  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
    console.log(Date.now());
    // Using date as id 
    //Adding todo into existing todos
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))

    // FOR BETTER UNDERSTANDING
    // prev.map((prevTodo) => {
    //   if(prevTodo.id === id){
    //     return todo //Upadting single todo finding by id
    //   }else {
    //     return prevTodo // returning preveious state as it is 
    //   }
    // })
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
    // Remove only one todo from array using filter and return reamaining array instead
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)))
    //Changing only completed value
    //{ ...prevTodo, completed: !prevTodo.completed} all values same except completed
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")) //Getting all todos from localStorage after loading
    //Values from String -> JSON
    if (todos && todos.length > 0) {
      setTodos(todos); //Setting todos 
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)) //Key value pair Key : "todos" , value: JSON.stringify(todos)
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id}
                className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App