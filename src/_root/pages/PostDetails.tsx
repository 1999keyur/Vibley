import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/shared/Loader";
import PostStats from "@/components/ui/shared/PostStats";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostDetailsById } from "@/lib/react-query/queryAndMutation";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending: postLoading } = useGetPostDetailsById(id!);
  const { user } = useUserContext();
  const handleDeleteButton = () => {};
  const [postDetails, setPostDetails] = useState<Models.Document | null>(post!);
  useEffect(() => {
    if (post && !postLoading) setPostDetails(post!);
    return () => {
      setPostDetails(null);
    };
  }, [post]);

  return (
    <div className="post_details-container">
      {postDetails === null ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={postDetails?.imageURL}
            alt="post"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${postDetails?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    postDetails?.creator?.imageURL ||
                    "assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full  w-8 h-8 lg:w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {postDetails?.creator?.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(postDetails?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {postDetails?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex-center ">
                <Link
                  to={`/update-post/${id}`}
                  className={`${
                    user?.id !== postDetails?.creator.$id && "hidden"
                  }`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={handleDeleteButton}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${
                    user?.id !== postDetails?.creator.$id && "hidden"
                  }`}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>
            <hr className="border w-full border-dark-2/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{postDetails?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {postDetails?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={postDetails} userId={user?.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
