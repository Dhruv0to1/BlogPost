import React, { useEffect, useState } from "react";
import databaseUser from "../appwrite/database";
import Postcard from "../components/postcard/postcard";
import Container from "../components/container/container";
import { useSelector } from "react-redux";
function AllPosts() {
  const [allPost, setAllPost] = useState([]);
  const posts = useSelector((state) => state.LoginStatus.post);
  async function getAllPost() {
    // const posts = await databaseUser.getPosts();
    // console.log(posts);
    if (posts.length !== 0) setAllPost(posts);
  }
  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {allPost.length !== 0 ? (
            allPost.map((item) => (
              <div key={item.$id} className="p-2 w-1/4">
                <Postcard {...item} />
              </div>
            ))
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
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
