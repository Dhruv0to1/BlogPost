import React, { useEffect, useState } from "react";
import PostForm from "../components/post-form/postForm";
import databaseUser from "../appwrite/database";
import Container from "../components/container/container";
import { useNavigate, useParams } from "react-router-dom";
function EditPost() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  async function getCurrPost() {
    let currentPost = await databaseUser.getPost(id);
    if (currentPost) {
      setPost(currentPost);
    } else {
      navigate("/");
    }
  }
  useEffect(() => {
    getCurrPost();
  }, [id]);
  return (
    <>
      {post && (
        <div className="py-8">
          <Container>
            <PostForm post={post} />
          </Container>
        </div>
      )}
    </>
  );
}

export default EditPost;
