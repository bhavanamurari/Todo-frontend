import React, { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs';

const Home = () => {
  const [todos, setTodos] = useState([]);
  useEffect(()=>{
    axios
      .get("https://todo-backend-tan-omega.vercel.app/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put("https://todo-backend-tan-omega.vercel.app/update/" + id)
      .then((result) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) =>{
    axios
      .delete("https://todo-backend-tan-omega.vercel.app/delete/" + id)
      .then((result) => window.location.reload())
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h2>Todo List</h2>
      <CreateTodo />
      {todos.length === 0 ? (
        <div><h2>No Records</h2></div>
      ) : (
        todos.map((todo) => (
          <div className="bg-dark text-white d-flex align-items-center rounded p-2 mb-2" style={{"width":"355px"}} >
            <div className="d-flex align-items-center " onClick={() => handleEdit(todo._id)}>
              {todo.done ? <BsFillCheckCircleFill className='m-1'/> : <BsCircleFill className="m-1"/>}
              <div>{ todo.done ? (<div className='text-success'>{todo.task}</div>) : (<div>{todo.task}</div>) }</div>
            </div>
            <div className="ms-auto" >
              <span><BsFillTrashFill onClick={() => handleDelete(todo._id)} /></span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
