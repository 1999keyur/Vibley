import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
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
          <h3 className="h3-bold md:h2-bold text-left w-full">Create Post</h3>
        </div>
        <PostForm />
      </div>
    </div>
  );
};

export default CreatePost;
