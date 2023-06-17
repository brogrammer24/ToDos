import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"


export default function App() {

const [todos, setTodos]= useState(()=>{
  const localValue = localStorage.getItem("ITEMS")
  if(localValue == null ) return []
  return JSON.parse(localValue)
})


useEffect(()=> {
  localStorage.setItem("ITEMS",JSON.stringify(todos))
},[todos])
function addTodo(title) {
  
    setTodos(currTodos => {
      return [
        ...currTodos,
        {id: crypto.randomUUID(), title,checked: false},
      ]
    })

}
function toggleTodo(id,checked){
  setTodos(currTodos => {
    return currTodos.map(todo =>{
      if(todo.id === id){
        return {...todo,checked}
      }
      return todo
    })
  })
}
function deleteTodo(id){
 setTodos(currTodos=>{
    return currTodos.filter(todo => todo.id !== id)
 })
}
  return (
    <>
   <NewTodoForm  onSubmit={addTodo}/>
       <h1 className="header">ToDo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}
