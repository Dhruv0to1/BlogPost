import React from "react";
import databaseUser from "../../appwrite/database";
import { Link } from "react-router-dom";
function Postcard({ $id, Title, Img }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={databaseUser.getFilePreview(Img)}
            alt={Title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{Title}</h2>
      </div>
    </Link>
  );
}

export default Postcard;
