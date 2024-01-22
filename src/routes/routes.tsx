import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import { rotesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <App />,
    children: rotesGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: rotesGenerator(adminPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: rotesGenerator(adminPaths),
  },
]);

export default router;
