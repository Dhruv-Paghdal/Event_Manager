import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const getOverviewStats = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${baseUrl}/api/dashboard/overview`, {
    headers: {
      Authorization: token,
    },
  });
};

export default {
  getOverviewStats,
};
