export const get = async (url, callback, headers = {}) => {
  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.data);
  }
  callback(json.data);
};

export const getOrderByAsc = async (url, callback, headers = {}) => {
  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.data);
  }
  json.data.sort((a, b) => b.votes - a.votes);
  callback(json.data);
};

export const postFormData = async (url, body, token) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: body,
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.data);
  }

  return json.data;
};

export const postJson = async (url, body, token) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: body,
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.data);
  }

  return json.data;
};

export const put = async (url, body, token) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: token,
    },
    body: body,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.data);
  }

  return json.data;
};

export const registerUserService = async ({ email, name, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.data);
  }
};

export const loginUserService = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.data);
  }

  return json.data;
};

export const getMyData = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/user`, {
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.data);
  }

  return json.data;
};

export const voteNewsService = async ({ vote, token, idNews }) => {
  const response = await postJson(
    `${process.env.REACT_APP_BACKEND}/news/${idNews}/votes`,
    JSON.stringify(vote),
    token
  );

  return response;
};

export const deleteSomeSortOfPostWithoutBody = async (url, token) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.data);
  }

  console.log("Console que hay que borrar en api.", json.data);
  return json.data;
};
