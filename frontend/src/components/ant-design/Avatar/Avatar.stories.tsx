import React from 'react';
import { Box } from '@components/atoms/Box';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, AvatarProps } from './Avatar';

export default {
  component: Avatar,
  title: 'Avatar',
  excludeStories: /.*Data$/,
};

const defaultAvatarPropsData: AvatarProps = {
  size: 40,
  icon: <UserOutlined />,
  bg: 'primary.dark',
};

const getAvatarPropsData = (overwrite: Partial<typeof defaultAvatarPropsData> = {}) => ({
  ...defaultAvatarPropsData,
  ...overwrite,
});

export const Colors = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Avatar {...getAvatarPropsData({ bg: 'primary.main' })} />
    <Avatar {...getAvatarPropsData({ bg: 'info.main' })} />
    <Avatar {...getAvatarPropsData({ bg: 'success.main' })} />
    <Avatar {...getAvatarPropsData({ bg: 'warning.main' })} />
  </Box>
);

export const Sizes = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Avatar {...getAvatarPropsData({ size: 32 })} />
    <Avatar {...getAvatarPropsData({ size: 40 })} />
    <Avatar {...getAvatarPropsData({ size: 160 })} />
  </Box>
);
