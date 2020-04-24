import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { FormItemProps } from 'antd/lib/form';

import { FieldProps, FormikProps, FormikErrors } from 'formik';

export type FormikSelectProps = FieldProps & SelectProps<any> & FormItemProps;

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

export const Select = ({
  form,
  field: { name, value },
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
}: FormikSelectProps) => {
  const errorMessage = form.touched[name] ? form.errors[name] : undefined;
  const status = validateStatus || getStatus(form, errorMessage);
  const style = rest.style || {};

  const handleChange = (v?: SelectValue) => {
    form.setFieldValue(name, v);
  };

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
    onChange: handleChange,
    value,
    disabled: rest.disabled || status === 'validating',
    loading: rest.loading || status === 'validating',
    id: rest.id || name,
    maxTagTextLength: 20,
    style: { width: '100%', ...style },
  };

  return (
    <FormItem {...itemProps}>
      <AntSelect {...inputProps} />
    </FormItem>
  );
};
