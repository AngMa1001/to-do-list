import React, {useState} from "react";
import logo from '../logo.svg';
import '../App.css';
import Header from "./Header";
import Todolist from "./ToDoList";
import sessionTodoList, { getTodoList, saveTodoList } from "../util/TodoList";

// 1. type todos press enter 
// 2. store value as todos
// 3. store todos into a todolist js
// 4. todolist with comepleted, content, id keys
// 5. show array of todos



function App() {
  const [todoList, setTodoList] = useState(getTodoList());
  // localStorage.removeItem('todoList');
  
  function addTodos(newTodos){
    setTodoList(prevList =>{
      if(prevList === null){
        var createdTodos = createTodos(newTodos.content, 0);
        saveTodoList(createdTodos);
        return [createdTodos];
      }else{
        var createdTodos = createTodos(newTodos.content, todoList.length);
        saveTodoList([...prevList, createdTodos]);
        return [...prevList, createdTodos];
      }
    })
  }

  function createTodos(content, id){
    const createdTodos = {
      _id : id,
      content: content,
      completed : false
    }
    return createdTodos;
  }

  return (
    <div className="app">
      <div className="content-wrapper">
        <Header />
        <div className="todo-wrapper">
          <Todolist 
            onAdd={addTodos}
          />
        </div>
        {todoList && todoList.map((todos, index) =>{
          return todos && (
            <li key={todos._id}>{todos.content} {index}</li>
          )
        })}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    </div>
  );
}

export default App;
