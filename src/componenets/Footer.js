import {
  ALargeSmallIcon,
  Home,
  Link,
  PlaySquareIcon,
  Settings,
  User2,
  Video,
} from "lucide-react";
import React from "react";

function Footer() {
  return (
    <button className="flex md:justify-between justify-around  items-center w-full  text-white font-bold  h-16 text-center bg-black">
      <div className="flex">
        <div className="flex ">
          <span className="md:p-2 m-1">
            <Home />{" "}
          </span>
          <span className="md:p-2 m-1">
           Home
          </span>
        </div>

        <div className="flex ">
          <span className="md:p-2 m-1 ">
            <Settings />
          </span>
          <span className="md:p-2 m-1">Settings</span>
        </div>
      </div>
    
      <div className="flex">
        <div className="flex ">
          <span className="md:p-2 m-1">
            <PlaySquareIcon />{" "}
          </span>
          <span className="md:p-2 m-1">
            Shorts
          </span>
        </div>
        <div className="flex ">
          <span className="md:p-2 m-1">
            <User2 />{" "}
          </span>
          <span className="md:p-2 m-1">
            User
          </span>
        </div>
      </div>
    </button>
  );
}

export default Footer;
