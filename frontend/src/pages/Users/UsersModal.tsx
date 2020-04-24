import React from 'react';
import { Modal, message, Select as AntSelect } from 'antd';
import { OptionProps } from 'antd/lib/mentions';
import { Formik, Form, Field, FormikHelpers as FormikActions } from 'formik';
import * as Yup from 'yup';
import { Input, Select } from 'components/formik';
import {
  UsersDocument,
  useUpdateUserAdminMutation,
  useRolesQuery,
  useDepartmentsQuery,
  Role,
  Permission,
  useCreateUserMutation,
  Department,
} from 'generated/graphql';

const { Option } = AntSelect;

interface UsersModalProps {
  visible: boolean;
  closeModal: () => void;
  initialValues: UsersFormValues;
  type: string;
}

interface UsersFormValues {
  id: string;
  name: string;
  profileURL?: string | undefined;
  roles: string[];
  departments?: string[];
  email: string;
  phone?: string | undefined;
  permissions?: string;
  image?: string | undefined;
}

const UsersModalSchema = Yup.object().shape({
  name: Yup.string()
    .required('Imię i nazwisko jest wymagane')
    .min(8, 'Imię i nazwisko nie powinno zawierać mniej niż 8 znaków')
    .max(80, 'Imię i nazwisko nie powinno być dłusze niż 80 znaków'),
  email: Yup.string().email('Wprowadzony email jest niepoprawny').required('Adres email jest wymagany'),
});

const permissions = Object.values(Permission);
/*
const StyledModal = styled(Modal)`
  .ant-modal-content {
    width: 800px;
  }
  .ant-modal-body {
    display: flex;
    justify-content: space-between;

    form {
      width: 70%;
    }
  }
`;
*/

export const UsersModal = (props: UsersModalProps) => {
  const refetchUsers = { refetchQueries: [{ query: UsersDocument }] };
  const [updateUser] = useUpdateUserAdminMutation(refetchUsers);
  const [createUser] = useCreateUserMutation(refetchUsers);
  const { data: rolesQueryData, loading: rolesLoading } = useRolesQuery();
  const { data: departmentsQueryData, loading: departmentsLoading } = useDepartmentsQuery();

  const parseRoles = (QueryData: Role[]): OptionProps[] =>
    QueryData.map(({ id, name }) => ({ value: id, children: name }));

  const parseDepartments = (QueryData: Department[]): OptionProps[] =>
    QueryData.map(({ id, name }) => ({ value: id, children: name }));

  const roles = rolesLoading ? [] : parseRoles(rolesQueryData!.roles);
  const departments = departmentsLoading ? [] : parseDepartments(departmentsQueryData!.departments);

  const handleSubmit = async (values: UsersFormValues, actions: FormikActions<UsersFormValues>) => {
    if (props.type === 'edit') {
      const hideLoading = message.loading('Trwa aktualizowanie użytkownika...', 0);
      // nie wysyłaj profileURL jeśli się nie zmienił, inaczej backend rzuci błąd
      let profileURL: string | undefined;
      if (props.initialValues.profileURL === values.profileURL) {
        profileURL = undefined;
      } else {
        profileURL = values.profileURL;
      }
      await updateUser({
        variables: {
          id: values.id,
          name: values.name,
          image: values.image,
          email: values.email,
          phone: values.phone,
          profileURL,
          roles: values.roles,
          departments: values.departments,
          permissions: values.permissions,
        },
      }).catch((error) => {
        console.log('Error', error.message);
      });
      hideLoading();
      message.success('Zaktualizowałeś użytkownika', 4);
    } else {
      const hideLoading = message.loading('Trwa dodawanie użytkownika...', 0);
      await createUser({
        variables: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          roles: values.roles,
          departments: values.departments,
          permissions: values.permissions,
        },
      });
      hideLoading();
      message.success('Utworzyłeś użytkownika', 4);
    }
    actions.setSubmitting(false);
    props.closeModal();
  };

  const profileUrlField = () => {
    return <Field component={Input} size="large" name="profileURL" label="URL Profilu" />;
  };

  /*
  const avatarField = () => {
    return <Avatar src={props.initialValues.image} size={150} />;
  };
  */

  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={handleSubmit}
      validationSchema={UsersModalSchema}
      enableReinitialize
    >
      {({ submitForm, resetForm }) => {
        return (
          <Modal
            visible={props.visible}
            onCancel={props.closeModal}
            title={props.type === 'add' ? 'Dodawanie nowego użytkownika' : 'Edycja użytkownika'}
            onOk={submitForm}
            okText={props.type === 'add' ? 'Dodaj' : 'Zapisz zmiany'}
            cancelText="Anuluj"
            okButtonProps={{ type: 'primary' }}
            afterClose={resetForm}
          >
            <Form>
              <Field component={Input} size="large" name="name" label="Imię i nazwisko" required />
              <Field component={Select} size="large" name="roles" label="Rola w CodersCrew">
                {roles.map((option) => (
                  <Option value={option.value} key={option.value}>
                    {option.children}
                  </Option>
                ))}
              </Field>
              <Field component={Select} size="large" name="departments" label="Obszar">
                {departments.map((option) => (
                  <Option value={option.value} key={option.value}>
                    {option.children}
                  </Option>
                ))}
              </Field>
              <Field component={Input} size="large" name="email" label="E-mail" required />
              <Field component={Input} size="large" name="phone" label="Telefon" />
              {props.type === 'edit' ? profileUrlField() : null}
              <Field component={Select} size="large" name="permissions" label="Rodzaj dostępu">
                {permissions.map((option) => (
                  <Option value={option} key={option}>
                    {option}
                  </Option>
                ))}
              </Field>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};
