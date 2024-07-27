import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Header, Footer } from "./components/index.js";
import { Outlet } from "react-router-dom";
function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  // const userStatus = useSelector((state) => state.status);
  useEffect(() => {
    authService
      .getCurrentAccount()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <>
      {!loader ? (
        <>
          <div className="outer-container">
            <div className="main-container">
              <Header />
              <main>
                <Outlet />
              </main>
              <Footer />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default App;
