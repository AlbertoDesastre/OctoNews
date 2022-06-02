export const searchParamsToObject = (searchParams) => {
  let params = {};
  for (const [key, value] of searchParams) {
    params[key] = value;
  }
  return params;
};
