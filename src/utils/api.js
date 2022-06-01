export const get = async (url, callback, headers = {}) => {
  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
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
    throw new Error(json.message);
  }

  callback(json.data);
};
