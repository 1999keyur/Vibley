import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  useGetCurrentUser,
  useLOgOutAccount,
} from "@/lib/react-query/queryAndMutation";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constant";
import { INavLink } from "@/Types";
import { Button } from "../button";

const Leftbar = () => {
  const navigate = useNavigate();
  const { mutateAsync: logOut, isPending: isLogOutSuccess } =
    useLOgOutAccount();
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const { data: currentUser, isPending: currentUserLoading } =
    useGetCurrentUser();
  useEffect(() => {
    if (isLogOutSuccess) navigate(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogOutSuccess]);
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={320}
          />
        </Link>

        <Link
          to={`/profile/${user?.id}`}
          className="flex
         gap-3 items-center"
        >
          <img
            src={user?.imageUrl || "assets/images/profile-placeholder.svg"}
            alt="profile"
            className="h-8 w-8 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user?.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className=" flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => {
          if (currentUser) logOut();
          else if (!currentUser && !currentUserLoading) navigate(0);
        }}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium ls:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default Leftbar;
