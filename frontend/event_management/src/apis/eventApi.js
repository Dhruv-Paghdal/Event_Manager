import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL;


const getEvents = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${baseUrl}/api/events`, {
    headers: {
      Authorization: token,
    },
  });
};

const createEvent = (data) => {
  const token = localStorage.getItem("token");
  return axios.post(`${baseUrl}/api/events`, data, {
    headers: {
      Authorization: token,
    },
  });
};

const deleteEvent = (eventId) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${baseUrl}/api/events/${eventId}`, {
    headers: {
      Authorization: token,
    },
  });
};

export default {
  getEvents,
  createEvent,
  deleteEvent,
};
