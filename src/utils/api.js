export const get = async (url, callback, headers = {}) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    if (response.ok) {
      const body = await response.json();
      callback(body);
    } else {
      console.log("error");
    }
  } catch (error) {
    throw error;
  }
};

export const post = async (url, body, callback) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (response.ok) {
      const body = await response.json();
      callback(body);
    } else {
      console.log("error");
    }
  } catch (error) {
    throw error;
  }
};
