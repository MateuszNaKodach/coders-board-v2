import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input as AntInput } from 'antd';
import { InputProps } from 'antd/lib/input';
import { FormItemProps } from 'antd/lib/form';
import { FieldProps, FormikProps, FormikErrors } from 'formik';

export type FormikInputProps = InputProps & FormItemProps & FieldProps;

const FormItem = Form.Item;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStatus = (
  form: FormikProps<any>,
  errorMessage?: string | string[] | FormikErrors<any> | FormikErrors<any>[],
) => {
  if (errorMessage) {
    return 'error';
  }
  if (form.isSubmitting || form.isValidating) {
    return 'validating';
  }
  return undefined;
};

export const Input = ({
  form,
  field: { name, onBlur, onChange, value },
  colon,
  extra,
  hasFeedback,
  help,
  htmlFor,
  label,
  labelCol,
  required,
  validateStatus,
  wrapperCol,
  ...rest
}: FormikInputProps) => {
  const errorMessage = form.touched[name] ? form.errors[name] : undefined;
  const status = validateStatus || getStatus(form, errorMessage);
  const disabled = rest.disabled || status === 'validating';

  const itemProps = {
    colon,
    extra,
    hasFeedback: hasFeedback || Boolean(status),
    help: errorMessage || help || undefined,
    htmlFor: htmlFor || name,
    label,
    labelCol,
    required,
    validateStatus: status,
    wrapperCol,
  };

  const inputProps = {
    ...rest,
    name,
    onBlur,
    onChange,
    value,
    disabled,
    id: rest.id || name,
  };

  return (
    <FormItem {...itemProps}>
      <AntInput {...inputProps} />
    </FormItem>
  );
};
