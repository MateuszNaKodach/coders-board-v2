import React from 'react';
import { Card } from '@components/ant-design/Card';
import { Button } from '@components/ant-design/Button';
import { Box } from '@components/atoms/Box';
import { Paragraph, Title } from '@components/ant-design/Typography';
import { LoginGraphic, Google } from '@components/svg';
import { LoginView } from './LoginView';

export default {
  component: LoginView,
  title: 'LoginView',
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <Box style={{ textAlign: 'center', fontStyle: 'normal' }}>
      <Card
        pt={36}
        pb={36}
        width={606}
        mt={88}
        mb={49}
        style={{ boxSizing: 'border-box', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
        <Title level={1} style={{ fontFamily: 'Roboto', paddingBottom: '36px', lineHeight: '36px' }}>
          Witaj w aplikacji CodersBoard
        </Title>
        <Paragraph large style={{ fontFamily: 'Roboto', height: '22px', lineHeight: '24px' }}>
          Zaloguj się za pomocą e-maila w domenie CodersCrew
        </Paragraph>
        <Button mt={24} style={{ height: '42px', borderRadius: '4px' }}> <Google style={{ height: '24px', position: 'relative', top: '4px', marginRight: '9px' }} />Zaloguj się z Google</Button>
      </Card>
      <LoginGraphic style={{ width: 544 }} />
    </Box>
  )
}

