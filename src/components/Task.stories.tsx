// import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TaskComponent from './Task';

export default {
  component: TaskComponent,
  title: 'Task',
} as ComponentMeta<typeof TaskComponent>;

const Template: ComponentStory<typeof TaskComponent> = args => <TaskComponent {...args} />;

export const Default: ComponentStory<typeof TaskComponent> = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    // updatedAt: new Date(2021, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_PINNED',
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_ARCHIVED',
  },
};