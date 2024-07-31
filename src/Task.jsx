import React from 'react';

const Task = ({ index, task, toggleStatus }) => {
  return (
    <li>
      {index + 1}. {task.description} - {task.assignee} {task.status === 'Pending' && `- ${task.deadline}`} - {task.status}
      <button onClick={() => toggleStatus(index)}>Toggle Status</button>
    </li>
  );
};

export default Task;
