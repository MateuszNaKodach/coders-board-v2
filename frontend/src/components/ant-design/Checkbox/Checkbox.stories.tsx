import React from 'react';
import { Box } from '@components/atoms/Box';
import { Checkbox } from './Checkbox';

export default {
  component: Checkbox,
  title: 'Checkbox',
  excludeStories: /.*Data$/,
};

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false },
];

export const Types = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Checkbox>Unchecked-Enabled</Checkbox>
    <Checkbox defaultChecked>Checked-Enabled</Checkbox>
    <Checkbox disabled>Unchecked-Disabled</Checkbox>
    <Checkbox defaultChecked disabled>
      Checked-Disabled
    </Checkbox>
  </Box>
);

export const Group = () => (
  <Box display="grid" gridGap={32} justifyItems="left">
    <Checkbox.Group options={plainOptions} defaultValue={['Apple']} />
    <Checkbox.Group options={options} defaultValue={['Pear']} />
    <Checkbox.Group options={optionsWithDisabled} disabled defaultValue={['Apple']} />
  </Box>
);
