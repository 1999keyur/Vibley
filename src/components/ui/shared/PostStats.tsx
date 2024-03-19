import { Models } from "appwrite";

type PostStatsPropTypes = {
  post: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsPropTypes) => {
  console.log(post);
  console.log(userId);
  return (
    <div className="flex justify-between z-20s">
      <div className="flex gap-2 mr-5">
        <img
          src="/assets/icons/like.svg"
          alt="like"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">0</p>
      </div>
      <div className="flex gap-2">
        <img
          src="/assets/icons/save.svg"
          alt="save"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;