import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const purchaseTicket = (data) => {
  const token = localStorage.getItem("token");
  return axios.post(`${baseUrl}/api/tickets/purchase`, data, {
    headers: { Authorization: token },
  });
};

const getUserTickets = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${baseUrl}/api/tickets/user`, {
    headers: { Authorization: token },
  });
};

const getEventTickets = (eventId) => {
  const token = localStorage.getItem("token");
  return axios.get(`${baseUrl}/api/tickets/event/${eventId}`, {
    headers: { Authorization: token },
  });
};

export default {
  purchaseTicket,
  getUserTickets,
  getEventTickets,
};
