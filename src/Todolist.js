import React, { useState } from 'react';
import { Input, Button, List, Checkbox } from 'antd';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (task) {
      if (editIndex !== null) {
        // If we're editing an existing task, update it
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = { text: task, completed: false };
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        // Otherwise, add a new task
        setTasks([...tasks, { text: task, completed: false }]);
      }
      setTask('');
    }
  };

  const handleEditTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="w-2/3 mx-auto my-8">
      <h1 className="text-3xl mb-4">TodoList</h1>
      <Input
        className="w-3/4 mr-2"
        placeholder="Add or edit a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button type='primary' style={{ backgroundColor: '#87cefa' }} onClick={handleAddTask} >
        {editIndex !== null ? 'Edit Task' : 'Add Task'}
      </Button>
      <List
        className="mt-4"
        bordered
        dataSource={tasks}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Checkbox
                checked={item.completed}
                onChange={() => handleTaskCompletion(index)}
              />,
              <Button
                onClick={() => handleEditTask(index)}
                className="mr-2"
                disabled={editIndex !== null}
              >
                Edit
              </Button>,
              <Button
                type="primary" danger
                onClick={() => handleDeleteTask(index)}
                disabled={editIndex !== null}
              >
                Delete
              </Button>,
            ]}
            className={`flex justify-between items-center ${
              item.completed ? 'line-through' : ''
            }`}
          >
            {item.text}
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList;
