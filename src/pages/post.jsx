import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import databaseUser from "../appwrite/database";
import PostForm from "../components/post-form/postForm";
import Container from "../components/container/container";
import Button from "../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { storeDeletePost } from "../features/authSlice";
import parse from "html-react-parser";
function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  // const [author, setAuthor] = useState(false);
  const data = useSelector((state) => state.LoginStatus.userData);
  const posts = useSelector((state) => state.LoginStatus.post);
  console.log(posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function getpost() {
    // const currPost = await databaseUser.getPost(id);
    posts.map((item) => {
      if (item.$id === id) {
        setPost(item);
      }
    });
  }
  async function deletePost() {
    const res = await databaseUser.deletePost(id);
    console.log(res);
    if (res) {
      await databaseUser.deleteFile(post.Img);
      dispatch(storeDeletePost({ id }));
      navigate("/");
    }
  }
  useEffect(() => {
    getpost();
  }, [id]);
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={databaseUser.getFilePreview(post.Img)}
            alt={post.Title}
            className="rounded-xl"
          />
          {data.$id === post.userId && (
            <div className="absolute right-6 top-6">
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
              <Link to={`/editPost/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.Title}</h1>
        </div>
        <div className="browser-css">{parse(post.Content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
