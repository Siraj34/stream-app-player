import React, { useContext, useState } from "react";
import {
  BiCloset,
  BiLogIn,
  BiMenu,
  BiMovie,
  BiSearch,
  BiUpload,
} from "react-icons/bi";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginOut, selectUser } from "../reducer/VideoReducer";
import {
  MdCreate,
  MdMenu,
  MdOutlineHome,
  MdOutlineSubscriptions,
} from "react-icons/md";
import { GrChannel } from "react-icons/gr";
import { LuDrama, LuSearchCheck } from "react-icons/lu";
import { AlbumContext, MusicContext } from "../context/ContextAl";
import { CgClose, CgMenuMotion } from "react-icons/cg";

function Header() {
  const { search, setSearch, SearchBar, setShorts, shorts, SearchShorts } =
    useContext(MusicContext);
  const login = useSelector(selectUser);
  const [sidebar, setSidebar] = useState(false);
  const [tags, setTags] = useState("");
  const dispatch = useDispatch();
  const router = useNavigate();
  const SideBarHead = () => {
    setSidebar(!sidebar);
  };

  const addSignOut = () => {
    dispatch(getLoginOut({}));
    router("/signin");
  };

  return (
    <div className="j justify-center relative md:h-full flex flex-col font-medium z-40 md:max-w-full'">
      <div className=" md:static justify-around flex md:max-w-full h-24 bg-slate-500 text-black font-medium z-40">
        <div className="flex m-1 p-2 ">
          <h1 className="m-3 md:flex hidden p-3 text-2xl " onClick={SearchBar}>
            <MdMenu />
          </h1>
          <div className="md:hidden flex text-2xl p-3">
            <span className="m-3  " onClick={SearchBar}>
              <MdMenu className=" text-2xl" />
            </span>
          </div>

          <Link to={"/"}>
            {" "}
            <img
              src="/images/soon6.png"
              alt=""
              className=" m-1 h-16 w-[200px] font-extralight rounded-full"
            />
          </Link>

        
        </div>

        
        <div className="  m-3 md:flex  hidden justify-center items-center p-1 ">
            <input
              type="search"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="search"
              className=" h-10   pl-5 text-black bg-slate-400  md:max-w-[1000px] max-w-[300px] md:w-[250px]"
            />
            <button
              onClick={() => router(`/search?q=${tags}`)}
              className="w-10 h-10 mr-2 text-xl  bg-slate-200 "
            >
              <LuSearchCheck className="m-2 text-2xl" />
            </button>
          </div>

        <div className="md:flex md:m-3 md:p-3  font-extrabold  hidden">
          <span className="p-3">
            <Link to={"/signin"}>{login?.email}</Link>
          </span>
          <span className="p-3">
            <Link to={"/signin"}>Login</Link>
          </span>

          <span className="p-3 " onClick={SideBarHead}>
            <MdMenu className=" text-2xl" />
          </span>
        </div>

        <div className="md:hidden flex text-2xl m-3 p-3">
      
          <div onClick={SearchShorts} className="m-3">
            <BiSearch className="text-2xl" />
          </div>
          <span className="m-3  " onClick={SideBarHead}>
            <MdMenu className=" text-2xl" />
          </span>
        </div>
      </div>

      <div className="  relative">
        {sidebar ? (
          <div className=" bg-zinc-900  text-sm overflow-y-auto md:h-[400px] h-[400px] w-[250px]  
           absolute right-0 text-white  top-[0px]">
            <div
              onClick={() => setSidebar(!sidebar)}
              className=" text-2xl m-2 p-2 h-10 font-medium flex  ml3"
            >
              {sidebar ? <BiCloset /> : <MdMenu />}
            </div>

            <button
              className=" text-sm m-2 p-2 h-10 
                font-medium flex  "
            >
              <div>
                 <img  src={login?.imageUrl} alt="" className="m-2 w-[25px] rounded-full"/>
              </div>
              <Link to={"/"}>
                <h1 className="m-2">Home</h1>
               
              </Link>
            </button>

            <button
              className=" text-sm m-2 p-2 h-10 
                font-medium flex  "
            >
              <div>
                <BiMovie className="m-3" />
              </div>
              <h1 className="m-2">
                <Link to={"/secure"}> Secure Movies</Link>
              </h1>
            </button>

            <button>
            <div>
                <BiMovie className="m-3" />
              </div>
              <h1 className="m-2">
                <Link to={`/history/${login?._id}`}> History</Link>
              </h1>
            </button>
          

            
            <button
              className=" text-sm m-2 p-2 h-10 
                font-medium flex  "
            >
              <div>
                <GrChannel className="m-3" />
              </div>
              <h1 className="m-2">
                <Link to={`/channelMovies/${login?._id}`}>Channel Movies</Link>
              </h1>
            </button>

           

            <button
              className=" text-sm m-2 p-2 h-10 
                font-medium flex  "
            >
              <div>
                <BiLogIn className="m-3" />
              </div>
              <h1 className="m-2">
                <Link to={"/signin"}>{login?.email}</Link>
              </h1>
            </button>

            <button
              className=" text-sm m-2 p-2 h-10 
                font-medium flex  "
            >
              <div>
                <BiLogIn className="m-3" />
              </div>
              <h1 className="m-2">
                <Link to={"/signin"}>Login</Link>
              </h1>
            </button>

            <button
              className=" text-sm m-2 p-2 h-10 
                font-medium flex  "
            >
              <div>
                <BiLogIn className="m-3" />
              </div>
              <h1 className="m-2" onClick={addSignOut}>
                Sign Out
              </h1>
            </button>

        
            <button
              className=" text-sm m-2 p-2 h-10 
                font-medium flex  "
            >
              <div>
                <MdCreate className="m-3" />
              </div>
              <h1 className="m-2">
                <Link to={"/movies"}>Create File Movies</Link>
              </h1>
            </button>

          
          </div>
        ) : null}
      </div>

      <div className="">
      
      {shorts ? (
          <div className=" 

          bg-zinc-900  flex flex-col md:hidden text-sm h-[400px] w-full absolute right-0 left-0 text-white  top-[95px]">
           
            <button className='h-10 justify-center items-center rounded-xl text-black font-extrabold m-2
            text-center border-b-2
             border-b-black bg-slate-500'>Search </button>
           
           <div className="  m-3 flex justify-center items-center p-1   ">
            <input
              type="search"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="search"
              className=" h-10   pl-5 text-black bg-slate-400 "
            />
            <button
              onClick={() => router(`/search?q=${tags}`)}
              className="w-10 h-10 mr-2 text-xl  bg-slate-200 "
            >
              <LuSearchCheck className="m-2 text-2xl" />
            </button>
          </div>
       
    </div>
 
      ):( 
  null )}
      </div>
    </div>
  );
}

export default Header;
