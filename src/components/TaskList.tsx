import React, { FC } from 'react';
import TaskComponent, { Task } from './Task';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateTaskState } from '../lib/store';

interface TaskList {
  loading?: Boolean,
  tasks?: Task[],
  onArchiveTask?: Function
  onPinTask?: Function
}

const TaskListComponent: FC<TaskList> = () => {
  // We're retrieving our state from the store
  const tasks: Task[] = useSelector((state: RootState) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((t: Task) => t.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter((t: Task) => t.state !== 'TASK_PINNED'),
    ];
    const filteredTasks = tasksInOrder.filter(
      (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );
    return filteredTasks;
  });

  const { status } = useSelector((state: RootState) => state.taskbox);

  const dispatch = useDispatch();

  const pinTask = (value: any) => {
    // We're dispatching the Pinned event back to our store
    const task: Task = tasks.filter((task: Task) => task.id === value)[0];
    dispatch(updateTaskState({ id: value, newTaskState: task?.state !== 'TASK_PINNED' ? 'TASK_PINNED' : 'TASK_INBOX' }));
  };
  const archiveTask = (value: Task) => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED' }));
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (status === 'loading') {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];
  return (
    <div className="list-items">
      {tasksInOrder.map((task) => (
        <TaskComponent key={task.id} task={task} onPinTask={(id: any) => pinTask(id)} onArchiveTask={(id: any) => archiveTask(id)} />
      ))}
    </div>
  );
}

export default TaskListComponent;