import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/ui/shared/Loader";
import { useGetPostDetailsById } from "@/lib/react-query/queryAndMutation";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();
  const [paramsId, setParamsId] = useState<string>(id!);
  const { data: PostDetails, isPending: PostDetailsLoading } =
    useGetPostDetailsById(paramsId && paramsId);
  const [postDetails, setPostDetails] = useState<Models.Document>();

  useEffect(() => {
    if (id) {
      setParamsId(id);
    }
  }, [id]);

  useEffect(() => {
    if (PostDetails) {
      setPostDetails(PostDetails);
    }
  }, [PostDetails]);

  if (PostDetailsLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start justify-start gap-3 w-full">
          <img
            src="/assets/icons/add-post.svg"
            alt="add post"
            height={36}
            width={36}
          />
          <h3 className="h3-bold md:h2-bold text-left w-full">Update Post</h3>
        </div>
        {PostDetailsLoading && <Loader />}
        {!PostDetailsLoading && (
          <PostForm
            post={!PostDetailsLoading && postDetails && postDetails}
            action="Update"
          />
        )}
      </div>
    </div>
  );
};

export default UpdatePost;
