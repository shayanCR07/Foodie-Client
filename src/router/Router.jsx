import {createBrowserRouter} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Shop/Menu";
import Signup from "../components/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/Shop/CartPage";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/manageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/Shop/Payment";
import Order from "../pages/dashboard/admin/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
          path: "/menu",
          element: <Menu />
        },
        {
          path: "/cart-page",
          element: <CartPage/>
        },
        {
          path: "/update-profile",
          element: <UpdateProfile />
        },
        {
          path: "/process-checkout",
          element: <Payment />
        },
        {
        path: '/orders',
        element: <Order />
      }
    ]
  },
  {
    path: "/signup",
    element: <Signup />
  },
  //admin routes
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children : [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'add-menu',
        element: <AddMenu />
      },
      {
        path: 'manage-items',
        element:<ManageItems />
      },
      {
        path: 'update-menu/:id',
        element: <UpdateMenu />,
        loader: ({params}) => fetch(`http://localhost:6001/menu/${params.id}`)
      }
    ]
  }
]);


export default router;