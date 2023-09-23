export const ok = (msg, data) => {
  return {
    code: 200,
    msg,
    data,
  };
};

export const fail = msg => {
  return {
    code: 500,
    msg,
  };
};

export const validationFailed = msg => {
  return {
    code: 401,
    msg,
  };
};
