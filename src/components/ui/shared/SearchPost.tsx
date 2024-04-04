import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchPostProps = {
  searchedPost: Models.DocumentList<Models.Document>;
  isSearchFetching: boolean;
};

const SearchPost = ({ searchedPost, isSearchFetching }: SearchPostProps) => {
  if (isSearchFetching) return <Loader />;
  if (searchedPost && searchedPost?.documents?.length > 0) {
    console.log(searchedPost?.documents);
    return <GridPostList posts={searchedPost?.documents} />;
  }
  return (
    <div>
      <p className="text-light-4 mt-10 text-center w-full">No Post founded</p>
    </div>
  );
};

export default SearchPost;
