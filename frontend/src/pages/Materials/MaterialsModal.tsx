import React, { useState } from 'react';
import { Modal, Select as AntSelect } from 'antd';
import { Formik, FormikHelpers as FormikActions, Field } from 'formik';
import { OptionProps } from 'antd/lib/mentions';
import * as Yup from 'yup';
import { Input, Select, ImageUpload } from 'components/formik';
import { useMaterialTagsQuery, MaterialTag } from 'generated/graphql';
import { addMaterial, updateMaterial } from './resolvers';
import { MaterialFormValues } from './types';

const { Option } = AntSelect;

interface MaterialsModalProps {
  values?: MaterialFormValues;
  destroyModal: () => void;
}

const emptyInitialValues: MaterialFormValues = {
  image: '',
  name: '',
  url: '',
  tags: [],
};

const materialsModalSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nazwa materiału jest wymagana')
    .min(8, 'Nazwa materiału nie powinna zawierać mniej niż 8 znaków')
    .max(80, 'Nazwa materiału nie powinna być dłusza niż 80 znaków'),
  url: Yup.string().url('Wprowadzony adres URL jest niepoprawny').required('Adres URL jest wymagany'),
});

const parseMaterialTagsToOptions = (tags: MaterialTag[]): OptionProps[] =>
  tags.map(({ id, name }) => ({ value: id, children: name }));

const handleSubmit = async (values: MaterialFormValues, actions: FormikActions<MaterialFormValues>) => {
  const resolverFunction = values.id ? updateMaterial : addMaterial;
  const isSuccess = await resolverFunction(values);

  if (isSuccess) actions.setStatus('submitted');

  actions.setSubmitting(false);
};

const MaterialsModal = ({ values, destroyModal }: MaterialsModalProps) => {
  const [visible, setVisible] = useState(true);
  const { data, loading } = useMaterialTagsQuery();
  const hideModal = () => setVisible(false);

  const tagsOptions = loading ? [] : parseMaterialTagsToOptions(data!.materialTags);
  const initialValues = values || emptyInitialValues;

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={materialsModalSchema}>
      {({ submitForm, status }) => {
        if (status === 'submitted') hideModal();

        return (
          <Modal
            title={`${initialValues.id ? 'Edytuj' : 'Dodaj nowy'} materiał`}
            visible={visible}
            afterClose={destroyModal}
            onOk={submitForm}
            okText={initialValues.id ? 'Zapisz zmiany' : 'Dodaj materiał'}
            onCancel={hideModal}
            cancelText={initialValues.id ? 'Anuluj zmiany' : 'Anuluj dodawanie'}
          >
            <Field
              name="image"
              component={ImageUpload}
              label="Miniaturka"
              width={1200}
              height={630}
              boxWidth={400}
              boxHeight={210}
            />
            <Field name="name" component={Input} label="Nazwa materiału" required />
            <Field name="url" component={Input} label="Adres URL" required />
            <Field name="tags" component={Select} label="Tagi" mode="tags" loading={loading}>
              {tagsOptions.map((option) => (
                <Option key={option.value} {...option} />
              ))}
            </Field>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default MaterialsModal;
