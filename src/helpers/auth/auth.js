// authentication helpers
export default {
  login($axios, payload) {
    return $axios.post("/admin/login", payload);
  },
  register($axios, payload) {
    return $axios.post("/admin/register", payload);
  },
};
