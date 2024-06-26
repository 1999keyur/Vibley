import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button";
import {
  useGetCurrentUser,
  useLOgOutAccount,
} from "@/lib/react-query/queryAndMutation";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const navigate = useNavigate();
  const { mutateAsync: logOut, isPending: isLogOutSuccess } =
    useLOgOutAccount();

  const { user } = useUserContext();

  const { data: currentUser, isPending: currentUserLoading } =
    useGetCurrentUser();

  useEffect(() => {
    if (isLogOutSuccess) navigate(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogOutSuccess]);
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5 ">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={320}
          />
        </Link>
        <div
          className="flex
        gap-4"
        >
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => {
              if (currentUser) logOut();
              else if (!currentUser && !currentUserLoading) navigate(0);
            }}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>

          <Link to={`/profile/${user?.id}`} className="flex-center gap-3">
            <img
              src={user?.imageUrl || "assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
