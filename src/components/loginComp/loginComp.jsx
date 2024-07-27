import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import { login as storeLogin } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Input from "../input/input";
import Logo from "../logo/logo";
import Button from "../button/button";
function LoginComp() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function onLogin(data) {
    try {
      setError("");
      const response = await authService.login(data);
      // console.log(response);
      if (response) {
        const userData = await authService.getCurrentAccount();
        if (userData) {
          dispatch(storeLogin({ userData }));
        }
      }
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onLogin)} className="mt-8">
          <div className="space-y-5">
            <Input
              type="email"
              label="Email Id:"
              placeholder="Enter you Email"
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
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginComp;
