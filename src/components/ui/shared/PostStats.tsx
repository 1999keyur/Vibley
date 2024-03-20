import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queryAndMutation";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsPropTypes = {
  post: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsPropTypes) => {
  // console.log(post);
  // console.log(userId);
  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );
  // console.log(currentUser);
  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(!!savedPostRecord);

  const { mutate: likePost, isPending: isLikeLoading } = useLikePost();
  const { mutate: savePost, isPending: isSaveLoading } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };
  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedPostRecord) {
      console.log(savedPostRecord);
      setIsSaved(false);
      deleteSavedPost({ savedPostRecord: savedPostRecord.$id });
    } else {
      setIsSaved(true);
      savePost({ postId: post.$id, userId: userId });
    }
  };
  return (
    <div className="flex justify-between z-20s">
      <div className="flex gap-2 mr-5">
        {isLikeLoading ? (
          <Loader />
        ) : (
          <img
            src={`${
              checkIsLiked(likes, userId)
                ? "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"
            }`}
            alt="like"
            width={20}
            height={20}
            onClick={handleLikePost}
            className="cursor-pointer"
          />
        )}
        <p className="small-medium lg:base-medium">
          {!isLikeLoading && likes.length}
        </p>
      </div>
      <div className="flex gap-2">
        {isSaveLoading ? (
          <Loader />
        ) : (
          <img
            src={`${
              isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
            }`}
            alt="save"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
