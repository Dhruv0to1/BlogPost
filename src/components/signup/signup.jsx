import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import { login as authLogin } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Input from "../input/input";
import Button from "../button/button";
import Logo from "../logo/logo";
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  async function onSignUp(data) {
    try {
      setError("");
      const response = await authService.createAccount(data);
      if (response) {
        const userData = await authService.getCurrentAccount();
        dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSignUp)}>
          <div className="space-y-5">
            <Input
              type="text"
              label="Name: "
              placeholder="Enter your Full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email Id: "
              type="email"
              placeholder="Enter your Email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(value) ||
                    "Email Address must be valid addresss",
                },
              })}
            />
            <Input
              type="password"
              label="Password: "
              placeholder="Enter password"
              {...register("password", {
                required: true,
                maxLength: 13,
                minLength: 8,
              })}
            />
            {errors.password && (
              <p className="text-red-600 mt-3 text-center">
                Password should be minimum 8 characters and maximum of 13
                characters
              </p>
            )}
            <Button type="onSubmit" className="w-full">
              SignUp
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
