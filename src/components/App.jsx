import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import logo from '../logo.svg';
import '../App.css';
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";
import { getTodoList, saveTodoList } from "../util/TodoList";
import ListSelector from "./ListSelector";
import { Filter } from "../util/Filter";

function App() {
  // Route view. Return main components
  const routeComponent = function (type){
    return (
      <div className="todo-wrapper">
        <TodoCreate 
          onAdd={addTodos}
        />
        <TodoList
          type={type}
          todos={todoList}
          onDelete={deleteTodos}
          onComplete={completeTodos}
        />
        <div className="todo-footer">
          <ListSelector />
        </div>
      </div>
    )
  }

  //App
  const [todoList, setTodoList] = useState(getTodoList());

  // localStorage.removeItem('todoList');
  // console.log(todoList); 
  // console.log(getTodoList());
  function addTodos(newTodos){
    setTodoList(prevList =>{
      if(prevList === undefined || prevList === null || prevList.length < 1){
        console.log("trigger add from none");
        const createdTodos = createTodos(newTodos.content, 0);
        saveTodoList(createdTodos);
        return [createdTodos];
      }else{
        console.log("trigger add from prev");
        const generatedId = todoList[(todoList.length -1)]._id + 1;
        const createdTodos = createTodos(newTodos.content, generatedId);
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
    console.log(createdTodos);
    return createdTodos;
  }

  function deleteTodos(id){
    setTodoList(prevList =>{
      const deletedTodos = prevList.filter((todoItem) => {
        return todoItem._id !== id;
      })
      saveTodoList(deletedTodos);
      return deletedTodos;
      })
  }

  function completeTodos(id){
    setTodoList(prevList =>{
      for(let i=0;i<prevList.length;i++){
        if(id === prevList[i]._id){
          prevList[i].completed =  !prevList[i].completed;
        } 
      }
      saveTodoList(prevList);
      return prevList
    })
  }
  
  return (
    <section className="app">
      <h1 className="todolist-logo">TodoList</h1>

      <Router>
        <Routes>
          <Route path="/"  element={routeComponent("all")}></Route>
          <Route path="/active" element={routeComponent("active")}></Route>
          <Route path="/completed" element={routeComponent("completed")}></Route>
        </Routes>
      </Router>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </section>
  );
}

export default App;
