import React, { useRef, ChangeEvent } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { DatePicker as AntDatePicker } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { DatePickerProps } from 'antd/lib/date-picker';
import { FieldProps, FormikProps, FormikErrors } from 'formik';
import moment, { Moment } from 'moment';

export type FormikDatePickerProps = DatePickerProps & FormItemProps & FieldProps;

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

const locale = {
  lang: {
    ok: 'Zapisz',
    today: 'Dzisiaj',
    now: 'Teraz',
    placeholder: 'Wybierz datę',
    clear: 'Wyczyść',
    month: 'Miesiąc',
    yera: 'Rok',
    timeSelect: 'Wybierz godzinę',
    dateSelect: 'Wybierz datę',
    yearFormat: 'YYYY',
    dateFormat: 'DD.MM.YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'DD.MM.YYYY HH:mm',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
  },
  timePickerLocale: {
    placeholder: 'Wybierz godzinę',
  },
  dateFormat: 'DD.MM.YYYY',
  dateTimeFormat: 'DD.MM.YYYY, HH:mm',
};

export const DatePicker = ({
  form,
  field: { name, onBlur, value },
  colon,
  extra,
  hasFeedback,
  help,
  htmlFor,
  label,
  labelCol,
  required,
  style = {},
  validateStatus,
  wrapperCol,
  ...rest
}: FormikDatePickerProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputEl = useRef<any>(null);
  const errorMessage = form.touched[name] ? form.errors[name] : undefined;

  const status = validateStatus || getStatus(form, errorMessage);
  const disabled = rest.disabled || status === 'validating';

  const handleChange = (momentDate: Moment | null) => {
    form.setFieldValue(name, !momentDate ? momentDate : momentDate.toDate());
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputEl.current!.picker.state.open === false && e.target.name === name) {
      onBlur(e);
    }
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

  const datePickerProps: DatePickerProps | object = {
    ...rest,
    name,
    onBlur: handleBlur,
    onChange: handleChange,
    disabled,
    id: rest.id || name,
    locale,
    style: {
      width: '100%',
      ...style,
    },
    value: value ? moment(value) : undefined,
  };

  return (
    <FormItem {...itemProps}>
      <AntDatePicker {...datePickerProps} ref={inputEl} />
    </FormItem>
  );
};
