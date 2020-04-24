import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, message } from 'antd';
import styled, { css } from 'styled-components';
import { Formik, Form as FormikForm, Field, FormikHelpers as FormikActions } from 'formik';
import * as Yup from 'yup';
import { ReactComponent as Logo } from 'static/logo.svg';
import { Input } from 'components/formik';
import { useAuth } from 'hooks';
import { showLazyMessage } from 'utils';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Heading = styled.h1`
  position: relative;
  bottom: 96px;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  opacity: 0.95;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 360px;
  min-height: 300px;
  padding: 32px;
  padding-top: 56px;
  border-radius: 4px;
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    box-shadow: ${theme.shadows.card};
  `}
`;

export const LogoWrapper = styled.div`
  position: absolute;
  top: -40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 264px;
  height: 80px;
  padding: 24px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.black};

  svg {
    width: 100%;
  }
`;

export const Form = styled(FormikForm)`
  width: 100%;

  .ant-btn {
    margin-top: 8px;
  }
`;

const initialValues = {
  email: '',
  password: '',
};

type SignInFormValues = typeof initialValues;

const signInSchema = Yup.object().shape({
  email: Yup.string().email('Błędny adres e-mail').required('Email jest wymagany'),
  password: Yup.string().min(8, 'Hasło musi mieć co najmniej 8 znaków').required('Hasło jest wymagane'),
});

const SignIn = () => {
  const { data, signIn } = useAuth();

  const handleSubmit = async (values: SignInFormValues, actions: FormikActions<SignInFormValues>) => {
    const hideLoading = message.loading('Trwa logowanie...', 0);

    try {
      await signIn({ variables: values });
      showLazyMessage('success', 'Zalogowałeś się na konto');
    } catch (ex) {
      const error = ex.graphQLErrors[0] && ex.graphQLErrors[0].message;
      if (error === 'WRONG_PASSWORD') showLazyMessage('error', 'Błędne hasło');
      if (error === 'WRONG_EMAIL') showLazyMessage('error', 'Użytkownik o podanym adresie e-mail nie istnieje');
    } finally {
      hideLoading();
      actions.setSubmitting(false);
    }
  };

  if (data && data.me) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Heading>Logowanie</Heading>
      <Content>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={signInSchema}>
          {({ isSubmitting }) => (
            <Form>
              <Field name="email" component={Input} label="Adres e-mail" size="large" autoComplete="email" required />
              <Field
                name="password"
                component={Input}
                label="Hasło"
                type="password"
                size="large"
                autoComplete="current-password"
                required
              />
              <Button htmlType="submit" size="large" type="primary" block loading={isSubmitting}>
                Zaloguj się
              </Button>
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

export default SignIn;
