import axios from "axios";
import React from "react";

const axiosPublic = axios.create({
    baseURL: "http://localhost:6001",
  });
  
const useAxiosPublic = () => {
  console.log("PUBLIC BASE URL:", axiosPublic.defaults.baseURL);

  return axiosPublic
};

export default useAxiosPublic;
