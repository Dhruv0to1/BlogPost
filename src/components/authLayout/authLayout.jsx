import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Protected({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.LoginStatus.status);
  useEffect(() => {
    if (authentication && userStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && userStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [userStatus, navigate, authentication]);

  return loader ? <h2>Loading...</h2> : <>{children}</>;
}

export default Protected;
