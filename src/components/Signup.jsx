import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, login, updateUserProfile, signUpWithGmail } =
    useContext(AuthContext);
    const axiosPublic = useAxiosPublic()
  //redirecting to home page or a specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic
            .post("/users", userInfo)
            .then((response) => {
              //console.log(response);
              alert("Account creation Successfully done!!");
              navigate(from, { replace: true });
            });
        });

        document.getElementById("my_modal_5").close();

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  //Login with google
  const handleRegister = () => {
    signUpWithGmail().then((result) => {
      const user = result.user;
      const userInfo = {
        name: result?.user?.displayName,
        email: result?.user?.email,
      };
      axiosPublic.post("/users", userInfo).then((response) => {
        //console.log(response);
        alert("Account creation Successfully done!!");
        navigate( "/");
      });
    }).catch((error) => {
      console.log(error);
      
    })
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20 p-5 rounded-lg">
        <div className="modal-action mt-0 flex flex-col justify-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body bg-white"
            method="dialog"
          >
            <h3 className="font-bold text-lg text-center text-black pb-5">
              Create an Account!
            </h3>
            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered bg-white text-black"
                {...register("email")}
              />
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered bg-white text-black"
                {...register("password")}
              />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-black"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            {/* error text */}

            {/* Login btn */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="SignUp"
                className="btn border-none text-white bg-green"
              />
            </div>
            <p className="text-center my-2">
              Already have an account?{" "}
              <button
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
                className="text-red underline"
              >
                Login
              </button>
              <Modal />
            </p>

            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>
          </form>
          {/* social login */}
          <div className="flex gap-2 item-center justify-center">
            <button className="btn btn-circle bg-gray-300 text-black border-none hover:bg-green hover:text-white">
              <FaGoogle />
            </button>
            <button className="btn btn-circle bg-gray-300 text-black border-none hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle bg-gray-300 text-black border-none hover:bg-green hover:text-white">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
