import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import TaskList from './TaskList';
import { Task } from './Task';
import { StoreState } from 'lib/store';

// A super-simple mock of the state of the store
export const MockedState: StoreState = {
  tasks: [
    { state: 'TASK_INBOX', id: '1', title: 'Task 1' },
    { state: 'TASK_INBOX', id: '2', title: 'Task 2' },
    { state: 'TASK_INBOX', id: '3', title: 'Task 3' },
    { state: 'TASK_INBOX', id: '4', title: 'Task 4' },
    { state: 'TASK_INBOX', id: '5', title: 'Task 5' },
    { state: 'TASK_INBOX', id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: '',
};

// A super-simple mock of a redux store
const Mockstore = ({ taskboxState, children }: { taskboxState: StoreState, children: ReactNode }) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState: taskboxState,
          reducers: {
            updateTaskState: (state, action) => {
              const { id, newTaskState } = action.payload;
              const task = state.tasks.findIndex((task: Task) => task.id === id);
              if (task >= 0) {
                state.tasks[task].state = newTaskState;
              }
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [(Story) => <div style={{ padding: '3rem' }}><Story /></div>],
  excludeStories: /.*MockedState$/,
} as ComponentMeta<typeof TaskList>;

const Template = () => <TaskList />;

export const Default: ComponentStory<typeof TaskList> = Template.bind({});
Default.decorators = [
  (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>,
];

export const WithPinnedTasks: ComponentStory<typeof TaskList> = Template.bind({});
WithPinnedTasks.decorators = [
  (story) => {
    const pinnedtasks = [
      ...MockedState.tasks.slice(0, 5),
      { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    ];

    return (
      <Mockstore
        taskboxState={{
          ...MockedState,
          tasks: pinnedtasks,
        }}
      >
        {story()}
      </Mockstore>
    );
  },
];


export const Loading: ComponentStory<typeof TaskList> = Template.bind({});
Loading.decorators = [
  (story) => (
    <Mockstore
      taskboxState={{
        ...MockedState,
        status: 'loading',
      }}
    >
      {story()}
    </Mockstore>
  ),
];

export const Empty: ComponentStory<typeof TaskList> = Template.bind({});
Empty.decorators = [
  (story) => (
    <Mockstore
      taskboxState={{
        ...MockedState,
        tasks: [],
      }}
    >
      {story()}
    </Mockstore>
  ),
];
