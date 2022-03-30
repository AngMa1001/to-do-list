import React, {useState} from "react";
import logo from '../logo.svg';
import '../App.css';
import Header from "./Header";
import TodoCreate from "./TodoCreate";
import List from "./List";
import sessionTodoList, { getTodoList, saveTodoList } from "../util/TodoList";

function App() {
  const [todoList, setTodoList] = useState(getTodoList());
  // localStorage.removeItem('todoList');
  console.log(getTodoList());
  console.log(todoList);
  function addTodos(newTodos){
    setTodoList(prevList =>{
      if(prevList === null){
        const createdTodos = createTodos(newTodos.content, 0);
        saveTodoList(createdTodos);
        return [createdTodos];
      }else{
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
    return createdTodos;
  }

  function deleteTodos(id){
    setTodoList(prevList =>{
      const deletedTodos = prevList.filter((todoItem) => {
        return todoItem._id !== id
      })
      saveTodoList(deletedTodos);
      return deletedTodos;
    })
  }

  return (
    <div className="app">
      <div className="content-wrapper">
        <Header />
        <div className="todo-wrapper">
          <TodoCreate 
            onAdd={addTodos}
          />
          {todoList && todoList.map((todos) =>{
            return todos && (
              <List 
                key={todos._id}
                id={todos._id}
                content={todos.content}
                onDelete={deleteTodos}
              />
            )
          })}
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    </div>
  );
}

export default App;
