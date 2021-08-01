export default {
  getAllTickets($axios) {
    return $axios.get(`/ticket/all?perPage=100&page=1`);
  },
  verifyTicket($axios, ticket_id) {
    return $axios.get(`/ticket/verify?ticket_id=${ticket_id}`);
  },
  revokeTicket($axios, ticket_id) {
    return $axios.get(`/ticket/revoke?ticket_id=${ticket_id}`);
  },
  createTicket($axios, payload) {
    return $axios.post("/ticket", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  updateTicket($axios, ticketId, payload) {
    return $axios.patch(`/ticket/update?ticket_id=${ticketId}`, payload);
  },
};
