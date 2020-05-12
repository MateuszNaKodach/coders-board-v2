import React from 'react';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons/lib';
import { action } from '@storybook/addon-actions';
import { Box } from '@components/atoms/Box';
import { Tag } from './Tag';

export default {
  component: Tag,
  title: 'Tag',
  excludeStories: /.*Data$/,
};

export const Basic = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Tag>Default</Tag>
    <Tag closable>Closable</Tag>
    <Tag closable onClose={action('close-tag')}>
      Closable(onCLose)
    </Tag>
  </Box>
);

export const Colored = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Tag color="primary.main" bg="primary.background">
      primary
    </Tag>
    <Tag color="success.main" bg="success.background">
      success
    </Tag>
    <Tag color="error.main" bg="error.background">
      error
    </Tag>
    <Tag color="warning.main" bg="warning.background">
      warning
    </Tag>
  </Box>
);

export const WithIcon = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Tag icon={<CheckCircleOutlined />}>success</Tag>
    <Tag icon={<CloseCircleOutlined />}>error</Tag>
    <Tag icon={<ExclamationCircleOutlined />}>warning</Tag>
    <Tag icon={<SyncOutlined spin />}>processing</Tag>
    <Tag icon={<ClockCircleOutlined />}>waiting</Tag>
    <Tag icon={<MinusCircleOutlined />}>stop</Tag>
  </Box>
);
