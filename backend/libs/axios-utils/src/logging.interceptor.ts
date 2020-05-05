export const axiosLoggingInterceptor = (
  logger: (reqRes: any) => void,
  logFulfilled: boolean,
  logRejected: boolean,
) => {
  return {
    onFulfilled: res => {
      if (logFulfilled) {
        logger(res);
      }
      return res;
    },
    onRejected: res => {
      if (logRejected) {
        logger(res);
      }
      return res;
    },
  };
};
