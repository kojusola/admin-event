import login from "@/pages/login/index";
import dashboard from "@/pages/dashboard/index";
import overview from "@/pages/dashboard/overview/index";
import tickets from "@/pages/dashboard/tickets/index";
import rentals from "@/pages/dashboard/rentals/index";
import blog from "@/pages/dashboard/blog/index";
import pagenotfound from "@/pages/pagenotfound/index";

function guardRoutes(to, from, next) {
  const token = localStorage.getItem("auth-token");
  if (token) {
    next();
  } else {
    next("/");
  }
}

const routes = [
  { path: "", component: login },
  {
    path: "/dashboard",
    component: dashboard,
    beforeEnter: guardRoutes,
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
