import axios from "axios";

export const postSubmit = async (data) => {
  try {
    const res = await axios.post("/api/hello", data);
    return res;
  } catch (e) {
    return e.response;
  }
};
