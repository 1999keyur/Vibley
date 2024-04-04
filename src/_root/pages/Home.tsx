import {
  useGetCurrentUser,
  useGetRecentPost,
} from "@/lib/react-query/queryAndMutation";
import Loader from "../../components/ui/shared/Loader";
import PostCard from "@/components/ui/shared/PostCard";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // let isLoading = true;
  // let post = null;
  const { data: posts, isPending: isPostLoading } = useGetRecentPost();
  const [recentPosts, setRecentPosts] = useState<
    Models.DocumentList<Models.Document>
  >(posts!);
  const navigate = useNavigate();
  const { data: currentUser, isPending: currentUserLoading } =
    useGetCurrentUser();
  useEffect(() => {
    setRecentPosts(posts!);
  }, [posts]);

  useEffect(() => {
    if (!currentUser && !currentUserLoading) {
      navigate(0);
    }
  }, [currentUser]);
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {!isPostLoading &&
                recentPosts?.documents.map((post: Models.Document) => {
                  // console.log(post);
                  return (
                    <PostCard key={post.$id} post={!isPostLoading && post} />
                  );
                })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
