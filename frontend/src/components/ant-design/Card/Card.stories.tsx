import React from 'react';
import { Box } from '@components/atoms/Box';
import { action } from '@storybook/addon-actions';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from './Card';

export default {
  component: Card,
  title: 'Card',
  excludeStories: /.*Data$/,
};

export const Sizes = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Card title="Default size card">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card size="small" title="Small size card">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Box>
);

export const WithoutBorder = () => (
  <Box display="grid" gridGap={16} justifyItems="left" p={10} bg="primary.background">
    <Card width={300} title="Card title" bordered={false}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Box>
);

export const WithImage = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Card
      width={300}
      hoverable
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Box>
);

export const WithActions = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Card
      width={300}
      cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
      actions={[
        <SettingOutlined onClick={action('click-setting')} key="setting" />,
        <EditOutlined onClick={action('click-edit')} key="edit" />,
        <EllipsisOutlined onClick={action('click-ellipsis')} key="ellipsis" />,
      ]}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Box>
);

export const CustomContent = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Card width={500} title="Card title">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card width={500} title="Card title" display="flex" justifyContent="space-between">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Box>
);
