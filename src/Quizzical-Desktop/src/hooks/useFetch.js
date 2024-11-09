import axios from "axios";

export const usePost = async (url, body) => {
    const response = await axios.post(url, body);
    console.log(response);
}