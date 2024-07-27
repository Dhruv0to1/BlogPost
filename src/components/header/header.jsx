import React from "react";
import { useSelector } from "react-redux";
import Logout from "./logout";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/logo";
function Header() {
  const authStatus = useSelector((state) => state.LoginStatus.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/allPost",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/addPost",
      active: authStatus,
    },
  ];

  return (
    <>
      <header className="py-3 shadow bg-gray-500">
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="100px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus ? (
              <li>
                <Logout />
              </li>
            ) : null}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
