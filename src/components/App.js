import React, { useState } from 'react';
import '../App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [editTask, setEditTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleClick = () => {
    if (task) {
      setTaskList([...taskList, task]);
      setTask('');
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    setEditTask(taskList[id]);
    setIsEdit(true);
  };

  const handleUpdate = () => {
    const newTaskList = [...taskList];
    newTaskList[editId] = editTask;
    setTaskList(newTaskList);
    setEditTask('');
    setEditId(null);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setEditTask('');
    setEditId(null);
    setIsEdit(false);
  };

  const handleDelete = (id) => {
    const newTaskList = taskList.filter((_, index) => index !== id);
    setTaskList(newTaskList);
  };

  return (
    <div className='container style'>
      <h1>TODO-LIST</h1>
      <div className='input'>
        <TextField
          id="outlined-multiline-flexible"
          label="Enter the Task"
          multiline
          maxRows={4}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button variant="contained" onClick={handleClick}>+ADD</Button>
      </div>
      <div className='list'>
        <ul>
          {taskList.map((task, id) => (
            <li key={id}>
              {isEdit && editId === id ? (
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  maxRows={4}
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
              ) : (
                <span>{task}</span>
              )}
              <Button variant="contained" color="primary" onClick={() => handleEdit(id)}>Edit</Button>
              {isEdit && editId === id ? (
                <Button variant="contained" color="success" onClick={handleUpdate}>Save</Button>
              ) : (
                <Button variant="contained" color="error" onClick={() => handleDelete(id)}>Delete</Button>
              )}
              {isEdit && editId === id && (
                <Button variant="contained" onClick={handleCancel}>Cancel</Button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;