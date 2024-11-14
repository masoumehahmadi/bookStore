import axios from "axios";

export const login = async (username, password) => {
  try {
    let response = await axios.post("http://localhost:3010/api/auth/login", {
      username,
      password,
    });
    const { token } = response.data;
    localStorage.setItem("token", token);
    return { status: true };
  } catch (err) {
    return {
      status: false,
      error: err.response ? err.response.data : err.message,
    };
  }
};
