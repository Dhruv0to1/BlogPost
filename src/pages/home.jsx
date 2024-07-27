import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import databaseUser from "../appwrite/database";
import { useDispatch } from "react-redux";
import Postcard from "../components/postcard/postcard";
import Container from "../components/container/container";
import { getPost } from "../features/authSlice";
function Home() {
  const [allPost, setAllPost] = useState([]);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.LoginStatus.status);
  async function getAllPost() {
    if (status) {
      const posts = await databaseUser.getPosts();
      if (posts.total !== 0) {
        const storePosts = posts.documents;
        dispatch(getPost({ storePosts }));
        setAllPost(storePosts);
      }
    }
  }
  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <div>
      {status ? (
        allPost.length !== 0 ? (
          <div className="w-full py-8">
            <Container>
              <div className="flex flex-wrap">
                {allPost.map((item) => (
                  <div key={item.$id} className="p-2 w-1/4">
                    <Postcard {...item} />
                  </div>
                ))}
              </div>
            </Container>
          </div>
        ) : (
          <div className="w-full py-8 mt-4 text-center">
            <Container>
              <div className="flex flex-wrap">
                <div className="p-2 w-full">
                  <h1 className="text-2xl font-bold hover:text-gray-500">
                    No Post to View
                  </h1>
                </div>
              </div>
            </Container>
          </div>
        )
      ) : (
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Login to read posts
                </h1>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}

export default Home;
