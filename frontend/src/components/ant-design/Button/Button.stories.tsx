import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Box } from '@components/atoms/Box';
import { Button } from './Button';

export default {
  component: Button,
  title: 'Button',
  excludeStories: /.*Data$/,
};

export const Types = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Box>
      <Button type="primary">Primary</Button>
      <Button ml={12} type="primary" disabled>
        Primary(disabled)
      </Button>
    </Box>
    <Box>
      <Button>Default</Button>
      <Button ml={12} disabled>
        Default(disabled)
      </Button>
    </Box>
    <Box>
      <Button type="dashed">Dashed</Button>
      <Button ml={12} type="dashed" disabled>
        Dashed(disabled)
      </Button>
    </Box>
    <Box>
      <Button type="link">Link</Button>
      <Button ml={12} type="link" disabled>
        Link(disabled)
      </Button>
    </Box>
  </Box>
);

export const Sizes = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Button size="large">Large</Button>
    <Button size="middle">Default</Button>
    <Button size="small">Small</Button>
  </Box>
);

export const Danger = () => {
  return (
    <Box display="grid" gridGap={16} justifyItems="left">
      <Box>
        <Button danger>Danger Default</Button>
        <Button ml={12} danger disabled>
          Danger Default(disabled)
        </Button>
      </Box>
      <Box>
        <Button type="primary" danger>
          Danger Primary
        </Button>
        <Button type="primary" ml={12} danger disabled>
          Danger Primary(disabled)
        </Button>
      </Box>
      <Box>
        <Button type="dashed" danger>
          Danger Dashed
        </Button>
        <Button type="dashed" ml={12} danger disabled>
          Danger Dashed(disabled)
        </Button>
      </Box>
      <Box>
        <Button type="link" danger>
          Danger Link
        </Button>
        <Button ml={12} type="link" danger disabled>
          Danger Link(disabled)
        </Button>
      </Box>
    </Box>
  );
};

export const Ghost = () => {
  return (
    <Box display="grid" gridGap={16} p={24} justifyItems="left" backgroundColor="text.primary">
      <Box>
        <Button ghost>Ghost</Button>
        <Button ml={12} ghost disabled>
          Ghost(disabled)
        </Button>
      </Box>
      <Box>
        <Button type="primary" ghost>
          Ghost Primary
        </Button>
        <Button type="primary" ml={12} ghost disabled>
          Ghost Primary(disabled)
        </Button>
      </Box>
      <Box>
        <Button type="dashed" ghost>
          Ghost Dashed
        </Button>
        <Button type="dashed" ml={12} ghost disabled>
          Ghost Dashed(disabled)
        </Button>
      </Box>
      <Box>
        <Button type="link" ghost>
          Ghost Link
        </Button>
        <Button type="link" ml={12} ghost disabled>
          Ghost Link(disabled)
        </Button>
      </Box>
    </Box>
  );
};

export const WithIcon = () => {
  return (
    <Box display="grid" gridGap={16} justifyItems="left">
      <Button icon={<DownloadOutlined />} type="primary">
        Primary
      </Button>
      <Button icon={<DownloadOutlined />}>Default</Button>
      <Button icon={<DownloadOutlined />} type="dashed">
        Dashed
      </Button>
      <Button icon={<DownloadOutlined />} type="link">
        Link
      </Button>
    </Box>
  );
};

export const IconOnly = () => {
  return (
    <Box display="grid" gridGap={16} justifyItems="left">
      <Button icon={<DownloadOutlined />} type="primary" />
      <Button icon={<DownloadOutlined />} />
      <Button icon={<DownloadOutlined />} type="dashed" />
      <Button icon={<DownloadOutlined />} type="link" />
    </Box>
  );
};

export const Loading = () => {
  return (
    <Box display="grid" gridGap={16} justifyItems="left">
      <Button loading type="primary">
        Primary
      </Button>
      <Button loading>Default</Button>
      <Button loading type="dashed">
        Dashed
      </Button>
      <Button loading type="link">
        Link
      </Button>
    </Box>
  );
};
