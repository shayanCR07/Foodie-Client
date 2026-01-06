import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:6001",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    // REQUEST interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/signup");
        }
        return Promise.reject(error);
      }
    );

    // 🔑 CLEANUP (VERY IMPORTANT)
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [logOut, navigate]);

  console.log("SECURE BASE URL:", axiosSecure.defaults.baseURL);
  return axiosSecure;
};

export default useAxiosSecure;
