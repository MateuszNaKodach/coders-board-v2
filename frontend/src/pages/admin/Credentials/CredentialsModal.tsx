import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Modal as AntdModal, Button as AntdButton } from 'antd';
import { Formik, Form, Field } from 'formik';
import { Input } from 'components/formik';
// import { useCreateCredentialMutation, useUpdateCredentialMutation, CredentialsDocument } from 'generated/graphql';

const Button = styled(AntdButton)`
  display: flex;
  align-items: center;
  align-self: flex-end;
  margin-bottom: 32px;
  font-size: 16px;
  text-align: center;

  span {
    margin-bottom: 2px;
  }
`;

type ModalPropsTypes = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: any;
  visible: boolean;
  closeModal(): void;
  type: string;
};

export const CredentialsModal = ({ initialValues, visible, closeModal, type }: ModalPropsTypes) => {
  const buttons = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
      <Button size="large" type="danger" onClick={closeModal}>
        Odrzuć
      </Button>
      <Button style={{ marginLeft: '10px' }} htmlType="submit" size="large" type="primary">
        Akceptuj
      </Button>
    </div>
  );

  // const refetchCredentials = { refetchQueries: [{ query: CredentialsDocument }] };
  // const [updateCredential] = useUpdateCredentialMutation(refetchCredentials);
  // const [createCredential] = useCreateCredentialMutation(refetchCredentials);

  /*
  const changeCredentials = async (id: string, name: string, login: string, password: string) => {
    if (type === 'edit') {
       await updateCredential({
        variables: { data: { name, login, password }, where: { id } },
      });
      closeModal();
    } else {
      await createCredential({ variables: { data: { name, login, password } } });
      closeModal();
    }
  };
  */

  const credentialFormValidation = Yup.object().shape({
    name: Yup.string().required('Nazwa jest wymagana'),
    login: Yup.string().required('Login jest wymagany'),
    password: Yup.string().required('Hasło jest wymagane'),
  });

  type CredentialFormValues = typeof initialValues;
  /*
  const handleSubmit = async (values: CredentialFormValues, actions: FormikActions<CredentialFormValues>) => {
    try {
      await changeCredentials(values.id, values.name, values.login, values.password);
      setTimeout(() => {
        message.success(type === 'edit' ? 'Zmieniono dostęp' : 'Dodano dostęp');
      }, 600);
    } catch (err) {
      const error = err.graphQLErrors[0] && err.graphQLErrors[0].code;
      if (error === 3010) {
        actions.setFieldError('name', 'Dostęp o podanej nazwie już istnieje');
      }
    } finally {
      actions.setSubmitting(false);
    }
  };
  */

  const handleSubmit = () => {
    console.log('submitting');
  };

  return (
    <AntdModal
      visible={visible}
      bodyStyle={{ paddingBottom: '0' }}
      footer={null}
      onCancel={closeModal}
      title={type === 'edit' ? 'Edycja dostępu' : 'Dodawanie dostępu'}
    >
      <Formik
        onSubmit={handleSubmit}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={credentialFormValidation}
      >
        <Form>
          <Field component={Input} size="large" name="name" label="Nazwa dostępu" />
          <Field component={Input} size="large" name="login" label="Login" />
          <Field component={Input} size="large" name="password" label="Hasło" />
          {buttons}
        </Form>
      </Formik>
    </AntdModal>
  );
};
