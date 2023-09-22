export const ok = (msg, data) => {
  return {
    code: 200,
    msg,
    data,
  };
};

export const fail = (msg) => {
  return {
    code: 500,
    msg,
  };
};
