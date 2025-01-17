import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateShop from "./pages/CreateShop";
import AuthLayout from "./layouts/AuthLayout";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Shop from "./pages/Shop";
import Orders from "./pages/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "create-a-product",
        element: <AddProduct />,
      },
      {
        path: "manage-shop",
        element: <Shop />,
      },
      {
        path: "shop-orders",
        element: <Orders />,
      }
    ]
  },
  {
    path:"/auth",
    element:<AuthLayout/>,
    children:[
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path:"register/create-a-shop",
        element:<CreateShop/>
      }
    ]
  },
]);

export default router;
