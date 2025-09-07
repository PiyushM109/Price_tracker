import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getToken = () => {
  try {
    const token = cookies.get("token");
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const deleteToken = () => {
  try {
    cookies.remove("token", { path: "/" });
  } catch (error) {
    console.log(error);
  }
};
