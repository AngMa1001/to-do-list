import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import logo from '../logo.svg';
import '../App.css';
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";
import { getTodoList, saveTodoList } from "../util/TodoList";
import ListSelector from "./ListSelector";
import ClearCompleted from "./ClearCompleted";
import LeftTodos from "./LeftTodos";

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
          todos={todoList.todos}
          onDelete={deleteTodos}
          onComplete={completeTodos}
          onToggleAll={toggleAll}
        />
        <div className="todo-footer">
          <LeftTodos 
          leftCount={todoList.leftCount}
          />
          <ListSelector
          type={type}
          />
          <ClearCompleted
          onDelete={clearCompleted}
          />
        </div>
      </div>
    )
  }

  //App
  const [todoList, setTodoList] = useState({
    todos : getTodoList() === null ? [] : getTodoList(),
    leftCount : countLeft(getTodoList())
  });
  // localStorage.removeItem('todoList');
  
  
  function countLeft(todos){
    let count = 0;
    if(todos === undefined || todos === null){
      count = 0;
    }else{
      for(let i =0; i<todos.length;i++){
        if(!todos[i].completed){
          count++;
        }
      }
    }
    return count;
  }

  function addTodos(newTodos){
    setTodoList(prevList =>{
      if(prevList.todos === undefined || prevList.todos === null || prevList.todos.length < 1){
        console.log("Add from none");
        const createdTodos = createTodos(newTodos.content, 0);
        saveTodoList([createdTodos]);
        return {todos : getTodoList(), leftCount : countLeft(getTodoList())};
      }else{
        console.log("Add from prev");
        const generatedId = prevList.todos[prevList.todos.length -1]._id + 1;
        const createdTodos = createTodos(newTodos.content, generatedId);
        saveTodoList([...prevList.todos, createdTodos]);
        return {todos: getTodoList(), leftCount : countLeft(getTodoList())};
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
  
  function completeTodos(id){
    setTodoList(prevList =>{
      for(let i=0;i<prevList.todos.length;i++){
        if(id === prevList.todos[i]._id){
          prevList.todos[i].completed =  !prevList.todos[i].completed;
        } 
      }
      saveTodoList(prevList.todos);
      return {todos : getTodoList(), leftCount : countLeft(prevList.todos)};
    })
  }

  function toggleAll(){
    setTodoList(prevList =>{  
      let count = 0
      prevList.todos.map(todo=>{
        if(todo.completed){
          count++;
        }
      })
      if(count === prevList.todos.length){
        prevList.todos.map(todo=>{
          todo.completed = false;
        })
      }else{
        prevList.todos.map(todo=>{
          todo.completed = true;
        })
      }
      saveTodoList(prevList.todos);
      return {todos : getTodoList(), leftCount : countLeft(prevList.todos)};
    })
  }

  function deleteTodos(id){
    setTodoList(prevList =>{
      const deletedTodos = prevList.todos.filter(todoItem => {
        return todoItem._id !== id;
      })
      saveTodoList(deletedTodos);
      return {todos : getTodoList(), leftCount : countLeft(getTodoList())};
      })
  }

  function clearCompleted(){
    setTodoList(prevList =>{
      const deletedTodos = prevList.todos.filter(todo => todo.completed === false);
      saveTodoList(deletedTodos);
      return {todos : getTodoList(), leftCount : countLeft(getTodoList())};
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