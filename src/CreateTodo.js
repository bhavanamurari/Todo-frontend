import React, { useState } from 'react';
import axios from 'axios';

const CreateTodo = () => {
    const [task, setTask] = useState("");
    const handleAdd = () =>{
        axios
          .post("https://todo-backend-tan-omega.vercel.app/add", {
            task: task,
          })
          .then((result) => {
            window.location.reload();
          })
          .catch((err) => console.log(err));
    }
  return (
    <div className='d-flex my-3'>
        <input type="text" onChange={(e)=> setTask(e.target.value)} style={{"width":"300px"}} className='border-dark rounded' placeholder='Enter Task'/>
        <button type="button" className=' btn bg-dark text-white' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default CreateTodo