import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateShop from "./pages/CreateShop";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path:"/register/create-a-shop",
    element:<CreateShop/>
  }
]);

export default router;
