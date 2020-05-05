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

export const axiosLoggingInterceptorEnv = axiosLoggingInterceptor(r => console.log(r), String(process.env.AXIOS_LOG_FULFILLED || false) == "true", String(process.env.AXIOS_LOG_REJECTED || true) == "true")
