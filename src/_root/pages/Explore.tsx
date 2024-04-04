import { Input } from "@/components/ui/input";
import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";
import SearchPost from "@/components/ui/shared/SearchPost";
import useDebounce from "@/Hooks/useDebounce";
import { useGetPosts, useSearchPost } from "@/lib/react-query/queryAndMutation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const { ref, inView } = useInView();
  const [searchValue, setSearchValue] = useState("");
  const {
    data: posts,
    isPending: isPostLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetPosts();
  const [postData, setPostData] = useState(posts);
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPost, isFetching: isSearchFetching } =
    useSearchPost(debouncedValue);
  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    postData?.pages.every((item) => item.documents.length === 0);
  useEffect(() => {
    if (posts && !isPostLoading) setPostData(posts);
  }, [posts]);
  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  if (!posts && isPostLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
          <Input
            type="text"
            placeholder="Search Post"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="bod-bold md:h3-bold">Popular Today</h3>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="flex flex-wrap w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchPost
            searchedPost={searchedPost!}
            isSearchFetching={isSearchFetching}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of Posts</p>
        ) : (
          postData?.pages.map((item, index) => {
            // console.log(item);
            return (
              <GridPostList
                key={`post-${index}`}
                posts={item.documents}
                isPostLoading={isPostLoading}
              />
            );
          })
        )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
