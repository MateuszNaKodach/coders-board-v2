import React from 'react';
import { Button } from 'antd';
import { Formik, Form, Field, FormikHelpers as FormikActions } from 'formik';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Input } from '.';

const inputGroup = 'Input';
const formItemGroup = 'FormItem';

const validateStatuses = {
  default: '',
  success: 'success',
  warning: 'warning',
  error: 'error',
  validating: 'validating',
};

const sizes = {
  large: 'large',
  default: 'default',
  small: 'small',
};

const types = {
  text: 'text',
  password: 'password',
};

const getInputProps = () => ({
  allowClear: boolean('allowClear', false, inputGroup),
  disabled: boolean('disabled', false, inputGroup),
  placeholder: text('placeholder', 'Wpisz e-mail...', inputGroup),
  size: select('sizes', sizes, 'default', inputGroup),
  type: select('type', types, 'text', inputGroup),
});

const getFormItemProps = () => ({
  colon: boolean('colon', false, formItemGroup),
  extra: text('extra', '', formItemGroup),
  hasFeedback: boolean('hasFeedback', false, formItemGroup),
  help: text('help', '', formItemGroup),
  label: text('label', 'E-mail', formItemGroup),
  required: boolean('required', false, formItemGroup),
  validateStatus: select('validateStatus', validateStatuses, '', formItemGroup),
});

const initialValues = {
  email: '',
};

type FormValues = typeof initialValues;

const wait = (time = 2000) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const handleSubmit = async (values: FormValues, actions: FormikActions<FormValues>) => {
  action('onSubmit')(values);
  await wait();
  actions.setSubmitting(false);
};

storiesOf('Formik', module).add('Input', () => {
  const inputProps = getInputProps();
  const formFieldProps = getFormItemProps();

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Field name="email" component={Input} {...inputProps} {...formFieldProps} />
          <Button htmlType="submit" loading={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
});
