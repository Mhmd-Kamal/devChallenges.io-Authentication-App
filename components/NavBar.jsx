import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  UserCircleIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
  PlayIcon,
} from "@heroicons/react/20/solid";

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const removeMenu = (e) => {
      if (e.target?.id !== "NavBar" && e.target.offsetParent?.id !== "NavBar") {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", removeMenu);

    return () => {
      window.removeEventListener("click", removeMenu);
    };
  }, []);

  return (
    <header
      id="NavBar"
      className="relative flex justify-between w-full pb-7 md:px-16"
    >
      <img src={"/devchallenges.svg"} alt="logo" />
      <button
        className={`flex items-center gap-3 ${session ? "block" : "hidden"}`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <img
          src="/man.png"
          alt="Avatar picture"
          className="w-8 rounded-md aspect-square"
        />
        <p className="hidden text-xs font-bold md:block text-light-text">
          Xanthe Neal
        </p>
        <PlayIcon
          id="menu-icon"
          style={{ transform: `rotate(${showMenu ? "210" : "30"}deg)` }}
          className="w-2 transition-all text-light-text md:block hidden"
        />
      </button>

      <div
        id="nav-menu"
        className={`${
          showMenu ? "block" : "hidden"
        } absolute transition-all duration-500 right-0 md:right-16 top-10 z-10 w-48 py-4 px-3 border border-dark-text rounded-xl bg-white font-medium text-xs text-inputLabel`}
      >
        <div className="flex gap-3 py-3 px-4 bg-[#f2f2f2] rounded-lg">
          <UserCircleIcon className="w-4" />
          <p>My Profile</p>
        </div>
        <div className="flex gap-3 px-4 py-3 pb-5 border-b border-b-dark-text">
          <UserGroupIcon className="w-4" />
          <p>Group Chat</p>
        </div>
        <button
          onClick={() => signOut()}
          className="flex gap-3 px-4 py-3 pt-5 text-pinkText"
        >
          <ArrowRightOnRectangleIcon className="w-4" />
          <p>Logout</p>
        </button>
      </div>
    </header>
  );
}
