export default {
  getUsers($axios, perPage, page) {
    return $axios.get(`/admin/users?perPage=${perPage}&page=${page}`);
  },
  updateVendorPayoutPercentage($axios, userId, payload) {
    return $axios.post(`/admin/update-percentage?userId=${userId}`, payload, { headers: {
      "Content-Type": "application/json",
    }});
  },
  getUsersPerRole($axios, perPage, page, payload) {
    return $axios.get(`/admin/users?perPage=${perPage}&page=${page}`, payload);
  },
};
