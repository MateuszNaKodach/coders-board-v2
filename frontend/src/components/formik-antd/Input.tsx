import React from 'react';
import {
  Input as AntInput,
  InputProps as AntInputProps,
  PasswordProps as AntPasswordProps,
  TextAreaProps as AntTextAreaProps,
} from 'formik-antd';
import { compose, space, layout } from 'styled-system';
import { styled, SpaceProps, LayoutProps } from '@services/theme';

type StyledSystemProps = SpaceProps & LayoutProps;

const styledSystem = compose(space, layout);

const options = { preserve: ['size'] };

export type InputProps = AntInputProps & StyledSystemProps;

const StyledInput = styled(AntInput, options)<InputProps>(styledSystem);

export const Input = (props: InputProps) => <StyledInput {...props} />;

export type PasswordProps = AntPasswordProps & StyledSystemProps;

const Password = styled(AntInput.Password, options)<PasswordProps>(styledSystem);

Input.Password = Password;

export type TextAreaProps = AntTextAreaProps & StyledSystemProps;

const TextArea = styled(AntInput.TextArea, options)<TextAreaProps>(styledSystem);

Input.TextArea = TextArea;
