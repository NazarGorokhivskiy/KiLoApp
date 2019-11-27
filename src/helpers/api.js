const SERVER_API_URL = "https://ngorokhivskiy-backend.appspot.com/";

export default {
  async get(path) {
    const res = await fetch(`${SERVER_API_URL}${path}`);

    return await res.json();
  },

  async post(path, body) {
    const res = await fetch(`${SERVER_API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    
    return await res.json();
  },
};
