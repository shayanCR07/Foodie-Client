import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { AuthContext } from "../contexts/AuthProvider";

const Modal = () => {
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signUpWithgmail, login} = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState("");

  //redirecting to home page or a specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    //console.log(email,password);
    login(email, password).then((result)=> {
      const user = result.user;
      alert("Login Successfull!!");
      document.getElementById('my_modal_5').close()
      navigate(from, {replace:true})
    }).catch((error)=> {
      const errorMessage = error.message;
      setErrorMessage("Provide a correct email and password!");
    })
  }

  //google sign in
  const handleLogin = () => {
    signUpWithgmail().then((result)=> {
      const user = result.user;      
      alert("Login Successfull!!");
      navigate(from, {replace:true})
    }).catch((error)=> console.log(error)
    )
  }

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
      <div className="modal-box bg-white text-black">
        <h3 className="font-bold text-lg text-center">Please Login!!</h3>
        {/* <p className="py-4"></p> */}
        <div className="modal-action mt-0 flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
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

           {
            errorMessage ? <p className="text-red text-xs italic">{errorMessage}</p> : ""
           }

            {/* Login btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                value="Login"
                className="btn border-none text-white bg-green"
              />
            </div>
            <p className="text-center my-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-red underline">
                SignUp
              </Link>{" "}
              now.
            </p>
            
          <button 
          htmlFor="my_modal_5"
          onClick={()=>document.getElementById('my_modal_5').close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {/* social login */}
          <div className="flex gap-2 item-center justify-center">
            <button className="btn btn-circle bg-gray-300 text-black border-none hover:bg-green hover:text-white" onClick={handleLogin}>
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
    </dialog>
  );
};

export default Modal;
