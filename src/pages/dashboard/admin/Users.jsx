import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure()
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });
  console.log(users);

  const handleMakeAdmin = user => {
    axiosSecure.patch(`/users/admin/${user._id}`).then( res => {
      alert(`${user.name} is now Admin!`);
      console.log(user);
      
      refetch()
    })
  }
  const handleDeleteUser = user => {
    axiosSecure.delete(`/users/${user._id}`).then( res => {
      alert(`${user.name} is now removed from the database`);
      refetch()
    })
  } 

  return (
    <div>
      <div className="flex items-center justify-between mx-20">
        <h5>All Users</h5>
        <h5>Total User:{users.length}</h5>
      </div>

      {/* Table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-green text-white rounded-lg">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody >
              {users.map((user, index) => (
                <tr key={index}>
                  <th className="bg-white">{index + 1}</th>
                  <td className="bg-white">{user.name}</td>
                  <td className="bg-white">{user.email}</td>
                  <td className="bg-white">{
                    user.role === 'admin' ? "Admin" : (
                      <button onClick = {()=> handleMakeAdmin(user)} className="btn btn-xs bg-indigo-500 btn-circle   text-white border-none"><FaUsers /></button>
                    )
                    }</td>
                  <td className="bg-white">
                    <button onClick= {()=> handleDeleteUser(user)} className="btn btn-xs bg-orange-400 text-white border-none"><MdDelete /></button>
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

export default Users;
