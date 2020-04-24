import { ReactNode } from 'react';
import { message } from 'antd';

type MessageType = 'info' | 'success' | 'error' | 'warn' | 'warning' | 'loading';

export const showLazyMessage = (type: MessageType, content: ReactNode): void => {
  setTimeout(() => {
    message[type](content);
  }, 600);
};
