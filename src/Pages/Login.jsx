import React, { useState } from "react";
import Modal from "react-modal";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BaseURL from "../Api/Api";
function Login() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      const regEmail =
        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      if (regEmail.test(formData?.email)) {
        if (formData?.password.length >= 6) {
          axios
            .post(`${BaseURL}/api/data`, formData)
            .then((response) => {
              console.log(response.data);
              if (response?.data?.status == "success") {
                message.success("successfully Login");
                navigate("/home");
              } else {
                message.warning("Login Failed");
              }
            });
        } else {
          message.warning("Password Minimum 6 character");
        }
      } else {
        message.warning("Please enter valid Email");
      }
    } else {
      message.warning("All feilds are required. Please try again.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App flex justify-center items-center h-screen bg-slate-300 p-5 ">
      <form
        className="login-form rounded-xl md:rounded-2xl space-y-5 shadow-2xl font-medium bg-white p-5 pr-9 py-12 w-[700px]"
        onSubmit={handleLogin}
      >
        <h1 className="text-4xl font-normal">LOGIN</h1>
        <div className="form-group flex flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <input
            className=" w-full px-4 py-3 rounded-md text-black border border-gray-300"
            type="text"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="w-full px-4 py-3 rounded-md border border-gray-300"
            type="password"
            id="password"
            name="password"
            placeholder="******"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex  space-x-2">
            <input type="checkbox" className="w-4 rounded-lg" name="" id="" />
            <h5>Remember Me</h5>
          </div>
          <div>
            <h5 className="cursor-pointer"> Forget Password?</h5>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="w-24 bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 border border-red-500 rounded">
            Login
          </button>
        </div>
        <div className="flex justify-center gap-2">
          <h4>Not Registered?</h4>
          <h4 className="text-red-700 cursor-pointer">Click here to join</h4>
        </div>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Welcome, {formData.email}!</h2>
        <p>You have successfully logged in.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default Login;
