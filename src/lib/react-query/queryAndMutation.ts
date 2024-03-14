import { INewUser } from "@/Types";
import { useMutation } from "@tanstack/react-query";
import { createNewUser, logOutAccount, signInAccount } from "../appwrite/api";

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createNewUser(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};
export const useLOgOutAccount = () => {
  return useMutation({
    mutationFn: logOutAccount,
  });
};
