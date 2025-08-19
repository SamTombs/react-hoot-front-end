import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const index = async () => {
  try {
    const accessToken = localStorage.getItem("token")
    const res = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.data.err) {
      throw new Error(res.data.err);
    }

    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export { index };
