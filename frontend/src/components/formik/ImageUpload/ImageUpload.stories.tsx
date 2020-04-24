import React from 'react';
import { Button } from 'antd';
import { Formik, Form, Field, FormikHelpers as FormikActions } from 'formik';
import { storiesOf } from '@storybook/react';
import { boolean, text, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ImageUpload } from '.';

const inputGroup = 'Input';
const formItemGroup = 'FormItem';

const validateStatuses = {
  default: '',
  success: 'success',
  warning: 'warning',
  error: 'error',
  validating: 'validating',
};

const getImageUploadProps = () => ({
  disabled: boolean('disabled', false, inputGroup),
  width: number('width', 200, undefined, inputGroup),
  height: number('height', 200, undefined, inputGroup),
  cropTitle: text('cropTitle', 'Przytnij zdjęcie', inputGroup),
  cropOk: text('cropOk', 'Zatwierdź', inputGroup),
  cropCancel: text('cropCancel', 'Anuluj', inputGroup),
});

const getFormItemProps = () => ({
  colon: boolean('colon', false, formItemGroup),
  extra: text('extra', '', formItemGroup),
  hasFeedback: boolean('hasFeedback', false, formItemGroup),
  help: text('help', '', formItemGroup),
  label: text('label', 'Zdjęcie', formItemGroup),
  required: boolean('required', false, formItemGroup),
  validateStatus: select('validateStatus', validateStatuses, '', formItemGroup),
});

const initialValues = {
  image: '',
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

storiesOf('Formik', module).add('ImageUpload', () => {
  const imageUploadProps = getImageUploadProps();
  const formFieldProps = getFormItemProps();

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Field
            name="image"
            component={ImageUpload}
            {...imageUploadProps}
            {...formFieldProps}
            width={200}
            height={200}
          />
          <Button htmlType="submit" loading={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
});
