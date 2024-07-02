import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import DashboardLayout from "./layout/DashboardLayout";
import DefaultLayout from "./layout/DefaultLayout";
import Inquiry from "./pages/inquiry";
import CreateInquiry from "./pages/inquiry/create";
import CategoryData from "./pages/categoryData";
import CreateCategoryData from "./pages/categoryData/create";
import Welcome from "./pages/Welcome";
// import { NotFound } from "../pages/NotFound";

const RouteLists = [
  {
    name: "Dashboard",
    path: "",
    element: Dashboard,
    layout: DashboardLayout,
    meta: {
      requiresAuth: true,
      header: "Dashboard",
      title: "Dashboard",
    },
  },
  {
    name: "Inquiry",
    path: "/dashboard/inquiry",
    element: Inquiry,
    layout: DashboardLayout,
    meta: {
      title: "Inquiry",
      header: "Inquiry",
    },
  },
  {
    name: "Create Inquiry",
    path: "/dashboard/inquiry/create",
    element: CreateInquiry,
    layout: DashboardLayout,
    meta: {
      title: "Create Inquiry",
      header: "Create Inquiry",
    },
  },
  {
    name: "Category Data",
    path: "/dashboard/category-data",
    element: CategoryData,
    layout: DashboardLayout,
    meta: {
      title: "Category Data",
      header: "Category Data",
    },
  },
  {
    name: "Create Category Data",
    path: "/dashboard/category-data/create",
    element: CreateCategoryData,
    layout: DashboardLayout,
    meta: {
      title: "Create Category Data",
      header: "Create Category Data",
    },
  },

  {
    name: "Update Category Data",
    path: "/dashboard/category-data/:id/update",
    element: CreateCategoryData,
    layout: DashboardLayout,
  },
  {
    name: "Register",
    path: "/register",
    element: Register,
    layout: DefaultLayout,
    meta: {
      title: "Sign Up",
      header: "Sign Up",
    },
  },
  {
    name: "Sign In",
    path: "/signin",
    element: SignIn,
    layout: DefaultLayout,
    meta: {
      header: "Sign In",
      title: "Sign In",
    },
  },
  {
    name: "Welcome",
    path: "/welcome",
    element: Welcome,
    layout: DefaultLayout,
    meta: {
      header: "Welcome",
      title: "Welcome",
    },
  },
  // {
  //   path: '*',
  //   element: NotFound,
  // },
];

const Router = () => (
  <Routes>
    {RouteLists.map((route) => (
      <Route key={route.path} element={<route.layout {...route.meta} />}>
        <Route path={route.path} element={<route.element />} />
      </Route>
    ))}
  </Routes>
);

export default Router;
