import React from 'react';
import { space, color, layout } from 'styled-system';
import { Tag as AntTag } from 'antd';
import { TagProps as AntTagProps } from 'antd/lib/tag';
import 'antd/lib/tag/style/css';
import { styled, SpaceProps, ColorProps, LayoutProps } from '@services/theme';

export type TagProps = AntTagProps & SpaceProps & ColorProps & LayoutProps;

const StyledTag = styled(AntTag, { preserve: ['color'] })(space, color, layout);

export const Tag = (props: TagProps) => <StyledTag {...props} />;
