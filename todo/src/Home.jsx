import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import Create from './Create';
import { BsFillTrashFill,BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';


function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        // Fetch todos from the server
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err)); 
    }, []);

    const handleEdit = (id) =>{
      axios.put('http://localhost:3001/update/'+id)
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err)); 
    }

    const handleDelete = (id) =>{
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result => {
          location.reload()
        })
        .catch(err => console.log(err));

    }





    return (
        <div>
            <h1>Todo List</h1>
            <Create />
            {
                todos.length === 0
                ?
                <div><h1>No Record</h1></div>  
                :
                todos.map(todo => (
                    <div  className='task'>
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ? 
                            <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                            :<BsCircleFill className='icon'/>

                            }
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>

                        </div>
                      <div>
                        <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)}/></span>
                      </div>
                      </div>
                    ))
            }
        </div>
    );
}

export default Home;
