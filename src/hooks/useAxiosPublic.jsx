import axios from "axios";
import React from "react";

const axiosPublic = axios.create({
    baseURL: "https://foodie-server-brk2.onrender.com/",
  });
  
const useAxiosPublic = () => {
  console.log("PUBLIC BASE URL:", axiosPublic.defaults.baseURL);

  return axiosPublic
};

export default useAxiosPublic;
