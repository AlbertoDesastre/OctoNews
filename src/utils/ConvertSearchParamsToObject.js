export const convertSearchParamsToObject = (searchParams) => {
  let params = {};
  for (const [key, value] of searchParams) {
    params[key] = value;
  }
  return params;
};
