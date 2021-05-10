export default {
  getAllTickets($axios) {
    return $axios.get(`/ticket/all?perPage=100&page=1`);
  },
  verifyTicket($axios, ticket_id) {
    return $axios.get(`/ticket/verify?ticket_id=${ticket_id}`);
  },
};
