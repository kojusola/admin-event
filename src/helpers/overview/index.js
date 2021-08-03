export default {
    getOverview($axios) {
      return $axios.get(`/profile/admin/overview`);
    },
  };
  