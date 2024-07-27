import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onClickHandle() {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  }
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={onClickHandle}
    >
      Logout
    </button>
  );
}

export default Logout;
