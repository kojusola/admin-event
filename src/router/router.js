import login from "../components/login";
import dashboard from "../components/dashboard";
import overview from "../components/overview";
import rentals from "../components/rentals";
import blog from "../components/blog";
import pagenotfound from "../components/pagenotfound";
import tickets from "../components/tickets";

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
