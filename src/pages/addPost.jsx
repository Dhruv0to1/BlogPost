import React from "react";
import Container from "../components/container/container";
import PostForm from "../components/post-form/postForm";
function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
