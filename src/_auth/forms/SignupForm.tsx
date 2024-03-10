import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpValidationformSchema } from "@/lib/validations";

const SignupForm = () => {
  const form = useForm<z.infer<typeof SignUpValidationformSchema>>({
    resolver: zodResolver(SignUpValidationformSchema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof SignUpValidationformSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const isLoading = true;
  return (
    <Form {...form}>
      <div className="sm:w-420px flex flex-center flex-col">
        {" "}
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create your account with Vibely
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-12">
          Let us know how we should call you
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary mt-6">
            {isLoading ? (
              <div className="flex-center gap-2">Loading..</div>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
