import React from 'react';
import { useEffectOnce } from 'react-use';
import { useTranslation } from '@services/translation';
import { useCounterState, useCounterActions } from '@store/counter';
import { Button } from '@components/ant-design/Button';
import { Box } from '@components/atoms/Box';
import { Logo } from '@components/svg';

export const Home = () => {
  const { t } = useTranslation('home');
  const counter = useCounterState();
  const { fetchCounter, setCounter } = useCounterActions();

  useEffectOnce(() => {
    fetchCounter();
  });

  const getCounterValue = () => {
    if (counter.status === 'idle' || counter.status === 'loading') return 'Loading...';
    if (counter.status === 'failure') return 'Error!';

    return counter.data;
  };

  const increment = () => {
    if (counter.data !== null) {
      setCounter(counter.data + 1);
    }
  };

  return (
    <>
      <Box width={320} height={80} p={24} backgroundColor="text.title">
        <Logo />
      </Box>
      <Box>Counter: {getCounterValue()}</Box>
      <Button m={24} disabled={counter.status !== 'success'} onClick={increment}>
        Increment
      </Button>
      <Box
        color={{ default: 'warning.main', xs: 'text.white', md: 'error.main' }}
        width={80}
        mt={24}
        bg="common.black"
        p={20}
        borderRadius="small"
      >
        {t('hi')}
      </Box>
    </>
  );
};
