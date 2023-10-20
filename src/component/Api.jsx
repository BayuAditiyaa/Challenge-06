import axios from "axios"
import { toast } from "react-toastify";

export const searchMovie = async (query) => {
  try {
    const token = localStorage.getItem("token");

      await axios.get(
      `https://shy-cloud-3319.fly.dev/api/v1/search/movie?page=1&query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  } catch (error) {
    console.log(error)
    console.log(error.response)
  }
};

export const getMovieList = async () => {
  try {
    const token = localStorage.getItem("token");

      await axios.get(
      `https://shy-cloud-3319.fly.dev/api/v1/movie/popular`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  } catch (error) {
    if (axios.isAxiosError(error)) {
      // If not valid token
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        // Temporary solution
      }

      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};