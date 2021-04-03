import login from "../pages/login/login";
import dashboard from "../pages/dashboard/dashboard";
import overview from "../pages/dashboard/overview/overview";
import tickets from "../pages/dashboard/tickets/tickets";
import rentals from "../pages/dashboard/rentals/rentals";
import blog from "../pages/dashboard/blog/blog";
import pagenotfound from "../pages/pagenotfound/pagenotfound";

const routes = [
  { path: "", component: login },
  {
    path: "/dashboard",
    component: dashboard,
    children: [
      { path: "", component: overview },
      { path: "rentals", component: rentals },
      { path: "blog", component: blog },
      { path: "tickets", component: tickets },
    ],
  },
  { path: "*", component: pagenotfound },
];

export default routes;
