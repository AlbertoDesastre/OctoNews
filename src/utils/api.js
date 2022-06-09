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

export const post = async (url, body, callback) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.data);
  }

  callback(json.data);
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
    throw new Error(json.message);
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

/* Esto está hardcoded ahora, cuando vaya por la parte del uso del contexto se cambiará */
export const postJson = async (url, body, token) => {
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

export const createNewCommentAPI = async (
  newsId,
  text,
  commentParentId = null,
  token
) => {
  postJson(
    `${process.env.REACT_APP_BACKEND}/news/${newsId}`,
    {
      comment: text,
      id_user: 1,
      id_reply_message: commentParentId,
      creation_date: new Date().toUTCString(),
    },
    token
  );
};
