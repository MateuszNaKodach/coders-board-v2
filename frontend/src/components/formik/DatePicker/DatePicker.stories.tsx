import React from 'react';
import { Button } from 'antd';
import { Formik, Form, Field, FormikHelpers as FormikActions } from 'formik';

import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { DatePicker } from '.';

const datePickerGroup = 'Input';
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

const getDatePickerProps = () => ({
  allowClear: boolean('allowClear', false, datePickerGroup),
  disabled: boolean('disabled', false, datePickerGroup),
  onOk: action('onOk'),
  onOpenChange: action('onOpenChange'),
  onPanelChange: action('onPanelChange'),
  placeholder: text('placeholder', 'Podaj datę rozpoczęcia', datePickerGroup),
  showTime: boolean('showTime', false, datePickerGroup),
  size: select('sizes', sizes, 'default', datePickerGroup),
});

const getFormItemProps = () => ({
  colon: boolean('colon', false, formItemGroup),
  extra: text('extra', '', formItemGroup),
  hasFeedback: boolean('hasFeedback', false, formItemGroup),
  help: text('help', '', formItemGroup),
  label: text('label', 'Data rozpoczęcia', formItemGroup),
  required: boolean('required', false, formItemGroup),
  validateStatus: select('validateStatus', validateStatuses, '', formItemGroup),
});

const initialValues = {
  date: '',
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

storiesOf('Formik', module).add('DatePicker', () => {
  const inputProps = getDatePickerProps();
  const formFieldProps = getFormItemProps();

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Field name="date" component={DatePicker} {...inputProps} {...formFieldProps} />
          <Button htmlType="submit" loading={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
});
