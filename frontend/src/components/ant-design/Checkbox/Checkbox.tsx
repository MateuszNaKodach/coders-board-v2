import React from 'react';
import { space, layout, flexbox } from 'styled-system';
import { Checkbox as AntCheckbox } from 'antd';
import { CheckboxProps as AntCheckboxProps, CheckboxGroupProps as AntCheckboxGroupProps } from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style/css';
import { styled, SpaceProps, LayoutProps, FlexboxProps } from '@services/theme';

export type CheckboxProps = AntCheckboxProps & SpaceProps;
export type CheckboxGroupProps = AntCheckboxGroupProps & SpaceProps & LayoutProps & FlexboxProps;

const StyledCheckbox = styled(AntCheckbox)(space);
const StyledCheckboxGroup = styled(AntCheckbox.Group)(space, layout, flexbox);

export const Checkbox = (props: CheckboxProps) => <StyledCheckbox {...props} />;
Checkbox.Group = (props: CheckboxGroupProps) => <StyledCheckboxGroup {...props} />;
