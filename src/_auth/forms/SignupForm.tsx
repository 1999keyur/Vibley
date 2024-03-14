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
import Loader from "@/components/ui/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import {
  useCreateUserAccountMutation,
  useSignInAccount,
} from "@/lib/react-query/queryAndMutation";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const navigate = useNavigate();

  const {
    mutateAsync: createUserAccount,
    isPending: isLoadingCreatingAccount,
  } = useCreateUserAccountMutation();

  const { mutateAsync: signInAccount } = useSignInAccount();

  const { checkAuthUser } = useUserContext();

  const form = useForm<z.infer<typeof SignUpValidationformSchema>>({
    resolver: zodResolver(SignUpValidationformSchema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpValidationformSchema>) {
    console.log(values);
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title: "opps! Sign Up Failed Please Try again",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sign In Failed. Please Try Again1" });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      toast({ title: "Please try again" });
    }
  }
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
            {isLoadingCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Submit"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
