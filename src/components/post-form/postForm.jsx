import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import databaseUser from "../../appwrite/database";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../input/input";
import Rte from "../realTimeEditor/rte";
import Select from "../select/select";
import Button from "../button/button";
import { addPost, updatePost } from "../../features/authSlice";
function PostForm({ post }) {
  const { register, handleSubmit, control, setValue, getValues, watch } =
    useForm({
      defaultValues: {
        Title: post ? post.Title : "",
        slug: post ? post.$id : "",
        Content: post ? post.Content : "",
        status: post ? post.status : "",
      },
    });
  const userInfo = useSelector((state) => state.LoginStatus.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function onPost(data) {
    if (post) {
      const response = data.Img[0]
        ? await databaseUser.uploadFile(data.Img[0])
        : null;
      if (response) {
        await databaseUser.deleteFile(post.Img);
      }
      //   post = data.Img[0]?{ ...data, Img: response.$id }:{...data,Img:post.$id};
      const update = await databaseUser.updatePost(post.$id, {
        ...data,
        Img: response ? response.$id : post.Img,
      });
      // console.log(update);
      if (update) {
        const id = post.$id;
        dispatch(updatePost({ id, update }));
        navigate(`/post/${update.$id}`);
      }
    } else {
      const response = await databaseUser.uploadFile(data.Img[0]);
      if (response) {
        let res = await databaseUser.createPost({
          ...data,
          Img: response.$id,
          userId: userInfo.$id,
        });
        console.log(res);
        if (res) {
          dispatch(addPost({ res }));
          navigate(`/post/${res.$id}`);
        }
      }
    }
  }
  const transformSlug = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s/g, "-");
    } else {
      return "";
    }
  }, []);
  useEffect(() => {
    const subscribe = watch((value, { name }) => {
      if (name === "Title") {
        setValue("slug", transformSlug(value.Title), { shouldValidate: true });
      }
    });

    return () => subscribe.unsubscribe();
  }, [watch]);
  return (
    <>
      <form onSubmit={handleSubmit(onPost)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            type="text"
            placeholder="Enter your title"
            label="Title"
            className="mb-4"
            {...register("Title", {
              required: true,
            })}
          />
          <Input
            type="text"
            label="slug"
            className="mb-4"
            {...register("slug", {
              required: true,
            })}
            onInput={(e) => {
              setValue("slug", transformSlug(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <Rte
            label="Content"
            name="Content"
            control={control}
            defaultValue={getValues("Content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Image"
            type="file"
            className="mb-4"
            accept="image/*"
            {...register("Img", {
              required: !post,
            })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={databaseUser.getFilePreview(post.Img)}
                alt={`Image with ID: ${post.Img}`}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            label="status"
            options={["active", "inactive"]}
            className="mb-4"
            {...register("status", {
              required: true,
            })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Post"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default PostForm;
