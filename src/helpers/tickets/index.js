export default {
  getAllTickets($axios, perPage, page) {
    return $axios.get(`/ticket/all?perPage=${perPage}&page=${page}`);
  },
  verifyTicket($axios, ticket_id) {
    return $axios.get(`/ticket/verify?ticket_id=${ticket_id}`);
  },
};
