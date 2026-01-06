import React from "react";
import useMenu from "../../../hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";

const ManageItems = () => {
  const [menu, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  // console.log(menu);

  // const handleDeleteItem = item => {
  //   //console.log(item);
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       console.log("ITEM ID:", item._id);
  //       const res = await axiosSecure.delete(`/menu/${item._id}`);
  //       console.log(res);
  //       if(res){
  //         Swal.fire({
  //           title: "Deleted!",
  //           text: "Your file has been deleted.",
  //           icon: "success",
  //         });
  //       }
  //     }
  //   });

  // };

  const handleDeleteMenuItem = (menu) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be permanently removed from the menu.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      console.log("DELETE OBJECT:", menu);
      if (result.isConfirmed) {
        try {
          console.log("MENU ID:", menu._id); // must exist in menus collection

          await axiosSecure.delete(`/menu/${menu._id}`);
          refetch();

          Swal.fire("Deleted!", "Menu item deleted successfully.", "success");
        } catch (error) {
          Swal.fire(
            "Error",
            error.response?.data?.message || "Menu item not found",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage all <span className="text-green">Menu Items!</span>
      </h2>
      {/* menu item table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <Link to={`/dashboard/update-menu/${item._id}`}>
                      <button className="btn btn-ghost btn-xs bg-orange-500 text-white">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteMenuItem(item)}
                      className="btn btn-ghost btn-xs text-red"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
