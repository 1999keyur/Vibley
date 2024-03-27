import { CreatePostValidationformSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "../ui/shared/FileUploader";
import { Models } from "appwrite";
import {
  useCreatePost,
  // useDeletePost,
  useUpdatePost,
} from "@/lib/react-query/queryAndMutation";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../ui/shared/Loader";

type PostFormPropsType = {
  post?: Models.Document;
  action?: "Update" | "Create";
};
const PostForm = ({ post, action }: PostFormPropsType) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutateAsync: createPostFunction, isPending: createPostLoading } =
    useCreatePost();
  const { mutateAsync: updatePostFunction, isPending: updatePostLoading } =
    useUpdatePost();

  console.log(post);

  const form = useForm({
    resolver: zodResolver(CreatePostValidationformSchema),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: post ? post?.imageURL : [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
  });

  useEffect(() => {
    console.log("post in use effect", post);

    form.reset({
      caption: post ? post?.caption : "",
      file: post ? post?.imageURL : [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    });
  }, [post]);

  const { user } = useUserContext();
  // 2. Define a submit handler.
  async function onSubmit(
    values: z.infer<typeof CreatePostValidationformSchema>
  ) {
    if (post && action === "Update") {
      const updatedPost = await updatePostFunction({
        ...values,
        postId: post?.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageURL,
      });

      if (!updatedPost) {
        toast({
          title: "Error while updating please try again",
        });
      }
      return navigate(`/posts/${post?.$id}`);
    }
    const newPost = await createPostFunction({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        title: "Error While creating, Please Try again",
      });
    }

    navigate("/");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  placeholder="Write your caption here..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  filedChange={field.onChange}
                  mediaUrl={post?.imageURL}
                />
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>

              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Tags (comma separated values)
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Goa, Beach, FriendsTrip"
                  {...field}
                />
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center gap-4">
          <Button className="shad-button_dark_4">Cancel</Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={updatePostLoading || createPostLoading}
          >
            {(updatePostLoading || createPostLoading) && <Loader />}
            {action === "Create" && "Submit"}
            {action === "Update" && "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
