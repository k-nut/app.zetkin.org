import { Meta, StoryObj } from '@storybook/react';

import ZUIRadioGroup from './index';

const meta: Meta<typeof ZUIRadioGroup> = {
  component: ZUIRadioGroup,
  title: 'New Design System/ZUIRadioGroup',
};
export default meta;

type Story = StoryObj<typeof ZUIRadioGroup>;

export const Primary: Story = {
  args: {
    direction: 'column',
    helperText: 'Helper text',
    label: 'Example Form',
    labelPlacement: 'end',
    options: [
      { label: 'Sweden', value: 'swe' },
      { label: 'Finland', value: 'fin' },
      { label: 'Norway', value: 'nor' },
      { label: 'Denmark', value: 'den' },
    ],
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    direction: 'column',
    disabled: true,
    helperText: 'Helper text',
    label: 'Example Form',
    labelPlacement: 'end',
    options: [
      { label: 'Sweden', value: 'swe' },
      { label: 'Finland', value: 'fin' },
      { label: 'Norway', value: 'nor' },
      { label: 'Denmark', value: 'den' },
    ],
    size: 'small',
  },
};

export const OneDisabledOption: Story = {
  args: {
    direction: 'column',
    label: 'Example Form',
    labelPlacement: 'end',
    options: [
      { label: 'Sweden', value: 'swe' },
      { disabled: true, label: 'Finland', value: 'fin' },
    ],
    size: 'small',
  },
};
