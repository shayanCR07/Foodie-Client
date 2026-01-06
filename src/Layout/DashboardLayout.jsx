import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { FaRegUserCircle, FaUser } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import { MdSpatialTracking } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import { RiMenuAddFill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

import logo from "/logo.png";

const sharedLinks = (
  <>
    <li>
      <Link to="/">
        <MdDashboard />
        Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <IoIosMenu />
        Menu
      </Link>
    </li>
    <li>
      <Link to="/orders">
        <MdSpatialTracking />
        Order Tracking
      </Link>
    </li>
    <li>
      <Link to="/">
        <MdContactSupport />
        Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const isAdmin = false;
  return (
    <div className="bg-primaryBG text-black">
      {/* {
        isAdmin? ( */}
          <div className="drawer lg:drawer-open ">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start mx-2 ">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4 mt-3 ">
            <label
              htmlFor="my-drawer-3"
              className="btn drawer-button lg:hidden"
            >
              <MdDashboardCustomize />
            </label>
            <button className="btn rounded-full px-6 bg-green items-center border-none flex text-white sm:hidden">
              <FaRegUserCircle />
              Logout
            </button>
          </div>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-slate-300 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link to="/" className="flex justify-start mb-3">
                <img src={logo} alt="" className="w-20" />
                <div className="badge badge-primary ml-3">Admin</div>
              </Link>
            </li>
            <hr />
            {/* <li>
              <Link to="/dashboard">
                <MdDashboard />
                Dashboard
              </Link>
            </li> */}
            {/* <li>
              <Link to="/dashboard">
                <FaBagShopping />
                Manage Bookings
              </Link>
            </li> */}
            <li>
              <Link to="/dashboard/add-menu">
                <RiMenuAddFill />
                Add Menu
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-items">
                <FaRegEdit />
                Manage Items
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/dashboard/users">
                <FaUser />
                All Users
              </Link>
            </li>
            <hr />
            {/* Shared Links */}
            {
                sharedLinks
            }
          </ul>
        </div>
      </div>
        {/* ) : (<p>Login</p>)
      } */}
    </div>
  );
};

export default DashboardLayout;
