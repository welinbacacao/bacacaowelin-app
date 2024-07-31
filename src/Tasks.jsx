import React, { useState, useEffect } from 'react';
import Task from './Task';
import SearchFilter from './SearchFilter';
import './index.css'; 

const getRandomDeadline = () => {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * 30) + 1;
  today.setDate(today.getDate() + randomDays);
  return today.toLocaleDateString();
};

const initialTasks = [
  { description: 'Task 1', assignee: 'John', deadline: getRandomDeadline(), status: 'Pending' },
  { description: 'Task 2', assignee: 'Jane', deadline: getRandomDeadline(), status: 'Pending' },
  { description: 'Task 3', assignee: 'Mike', deadline: getRandomDeadline(), status: 'Pending' },
  { description: 'Task 4', assignee: 'Lisa', deadline: getRandomDeadline(), status: 'Pending' },
  { description: 'Task 5', assignee: 'John', deadline: getRandomDeadline(), status: 'Pending' },
  { description: 'Task 6', assignee: 'Jane', deadline: getRandomDeadline(), status: 'Pending' },
  { description: 'Task 7', assignee: 'Mike', deadline: '', status: 'Completed' },
  { description: 'Task 8', assignee: 'Lisa', deadline: '', status: 'Completed' },
  { description: 'Task 9', assignee: 'John', deadline: '', status: 'Completed' },
  { description: 'Task 10', assignee: 'Jane', deadline: '', status: 'Completed' },
];

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(initialTasks);

  useEffect(() => {
    const filtered = tasks.filter(task =>
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  const toggleStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = updatedTasks[index].status === 'Pending' ? 'Completed' : 'Pending';
    if (updatedTasks[index].status === 'Pending') {
      updatedTasks[index].deadline = getRandomDeadline();
    } else {
      updatedTasks[index].deadline = '';
    }
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Tasks</h1>
      <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul>
        <li>
          <strong>No.</strong> <strong>Task Description</strong> <strong>Assignee</strong> <strong>Deadline</strong> <strong>Status</strong>
        </li>
        {filteredTasks.map((task, index) => (
          <Task key={index} index={index} task={task} toggleStatus={toggleStatus} />
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
