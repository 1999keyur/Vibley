import { CreatePostValidationformSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const CreatePost = () => {
  const form = useForm<z.infer<typeof CreatePostValidationformSchema>>({
    resolver: zodResolver(CreatePostValidationformSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreatePostValidationformSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
          <h3 className="h3-bold md:h2-bold text-left w-full">Create Post</h3>
        </div>
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
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
                    {/* <FileUploader /> */}
                    <Input type="text" className="shad-input" {...field} />
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
                  <FormLabel className="shad-form_label">Locatoin</FormLabel>
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
              <Button type="submit" className="shad-button_dark_4">
                Submit
              </Button>
              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePost;
