import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import Loader from "./Loader";
type ExplorePostType = {
  posts: Models.Document[];
  showUserProfile?: boolean;
  showPostStats?: boolean;
  isPostLoading?: boolean;
};

const GridPostList = ({
  posts,
  showUserProfile = true,
  showPostStats = true,
  isPostLoading,
}: ExplorePostType) => {
  const { user } = useUserContext();
  if (isPostLoading) return <Loader />;
  return (
    <ul className="grid-container">
      {posts?.map((post) => (
        <li key={post?.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post?.$id}`} className="grid-post_link">
            <img
              src={post?.imageURL}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>
          <div className="grid-post_user">
            {showUserProfile && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={post.creator.imageURL}
                  alt=""
                  className="h8
                   w-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}

            {showPostStats && <PostStats post={post} userId={user?.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
