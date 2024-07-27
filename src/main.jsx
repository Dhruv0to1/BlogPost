import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Protected from "./components/authLayout/authLayout.jsx";
import SignUp from "./pages/signup.jsx";
import AddPost from "./pages/addPost.jsx";
import AllPosts from "./pages/allPost.jsx";
import Post from "./pages/post.jsx";
import EditPost from "./pages/editPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <SignUp />
          </Protected>
        ),
      },
      {
        path: "/addPost",
        element: (
          <Protected>
            <AddPost />
          </Protected>
        ),
      },
      {
        path: "/allPost",
        element: (
          <Protected>
            <AllPosts />
          </Protected>
        ),
      },
      {
        path: "/addPost",
        element: (
          <Protected>
            <AddPost />
          </Protected>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <Protected>
            <Post />
          </Protected>
        ),
      },
      {
        path: "/editPost/:id",
        element: (
          <Protected>
            <EditPost />
          </Protected>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
