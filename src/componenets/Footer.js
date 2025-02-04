import {
  ALargeSmallIcon,
  Home,
  Link,
  PlaySquareIcon,
  Settings,
  SubscriptIcon,
  User2,
  Video,
} from "lucide-react";
import React, { useContext } from "react";
import { MdSubscriptions } from "react-icons/md";
import { MusicContext } from "../context/ContextAl";
import { useSelector } from "react-redux";
import { selectUser } from "../reducer/VideoReducer";
import { useNavigate } from "react-router-dom";

function Footer() {
   const {search,setSearch,SearchBar,setTags,tags,get,bar,} = useContext(MusicContext)
   const login = useSelector(selectUser)
   const router = useNavigate()
  return (
    <button className="flex md:justify-center text-sm justify-around items-center w-full  text-white font-bold  h-16 text-center bg-black">
      <div className="flex m-1">
        <div className="flex ">
          <span className="md:p-2 m-1" >
            <Home />
          </span>
          <span className="md:p-2 m-1" onClick={() => router(`/`)}>
           Home
          </span>
        </div>

      </div>
    
      <div className="flex">
        <div className="flex ">
          <span className="md:p-2 m-1">
            <PlaySquareIcon />{" "}
          </span>
          <span className="md:p-2 m-1" onClick={() => router(`/search?tag=${tags}`)}>
            
            Shorts
          </span>
        </div>
        <div className="flex ">
          <span className="md:p-2 m-1">
            <User2 />{" "}
          </span>
          <span className="md:p-2 m-1"  onClick={() => router(`/channelMovies/${login?._id}`)}>
           You
          </span>
        </div>
      </div>
    </button>
  );
}

export default Footer;
