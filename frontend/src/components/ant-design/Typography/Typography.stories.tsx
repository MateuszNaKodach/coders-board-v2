import React from 'react';
import { Box } from '@components/atoms/Box';
import * as Typography from './Typography';

export default {
  component: Typography,
  title: 'Typography',
  excludeStories: /.*Data$/,
};

export const Title = () => (
  <Box display="grid" gridGap={16}>
    <Typography.Title level={1}>h1 Title</Typography.Title>
    <Typography.Title level={2}>h2 Title</Typography.Title>
    <Typography.Title level={3}>h3 Title</Typography.Title>
    <Typography.Title level={4}>h4 Title</Typography.Title>
  </Box>
);

export const Paragraph = () => (
  <Box display="grid" gridGap={16}>
    <Typography.Paragraph large>Paragraph (large)</Typography.Paragraph>
    <Typography.Paragraph>Paragraph (default)</Typography.Paragraph>
    <Typography.Paragraph small>Paragraph (small)</Typography.Paragraph>
    <Typography.Paragraph strong>Paragraph (strong)</Typography.Paragraph>
    <Typography.Paragraph type="secondary">Paragraph (secondary)</Typography.Paragraph>
    <Typography.Paragraph type="warning">Paragraph (warning)</Typography.Paragraph>
    <Typography.Paragraph type="danger">Paragraph (danger)</Typography.Paragraph>
    <Typography.Paragraph disabled>Paragraph (disabled)</Typography.Paragraph>
    <Typography.Paragraph mark>Paragraph (mark)</Typography.Paragraph>
    <Typography.Paragraph code>Paragraph (code)</Typography.Paragraph>
    <Typography.Paragraph underline>Paragraph (underline)</Typography.Paragraph>
    <Typography.Paragraph delete>Paragraph (delete)</Typography.Paragraph>
  </Box>
);

export const Text = () => (
  <Box display="grid" gridGap={16}>
    <Typography.Text large>Text (large)</Typography.Text>
    <Typography.Text>Text (default)</Typography.Text>
    <Typography.Text small>Text (small)</Typography.Text>
    <Typography.Text strong>Text (strong)</Typography.Text>
    <Typography.Text type="secondary">Text (secondary)</Typography.Text>
    <Typography.Text type="warning">Text (warning)</Typography.Text>
    <Typography.Text type="danger">Text (danger)</Typography.Text>
    <Typography.Text disabled>Text (disabled)</Typography.Text>
    <Typography.Text mark>Text (mark)</Typography.Text>
    <Typography.Text code>Text (code)</Typography.Text>
    <Typography.Text underline>Text (underline)</Typography.Text>
    <Typography.Text delete>Text (delete)</Typography.Text>
  </Box>
);
