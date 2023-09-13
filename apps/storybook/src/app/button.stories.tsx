import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { Button } from 'libs/components';

const meta: Meta<typeof Button> = {
  component: Button,

  title: 'Atoms/Button',
};
export default meta;

type Story = StoryObj<typeof Button>;

export const ButtonElement: Story = {
  args: {
    text: 'I am a button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/I am a button/gi)).toBeTruthy();
  },
};
