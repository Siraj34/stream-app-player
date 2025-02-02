import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { EllipsisVertical, Pointer } from "lucide-react";
import { selectUser, selectVideo } from "../reducer/VideoReducer";
import { useSelector } from "react-redux";
import { MusicContext } from "../context/ContextAl";

function SideVideo() {
  const { play, setplay, controls, setcontrols, Data } =
    useContext(MusicContext);
    const video =useSelector(selectVideo)
     const login =useSelector(selectUser)
  console.log(Data, "tttttttt");
  return (
    <div className="max-w-[350px] max-h-[400px] flex flex-wrap  justify-center  ">
      {Data?.map((item, keys) => (
        <button key={keys} className=" m-2  " onClick={() => setcontrols(keys)}>
          <Link to={`/room/${item._id}${item?.postBy}`}>
            <button><img
              src={item?.imageUrl}
              className="md:-h-[300px] md:w-[300px] h-[300px] w-[300px] 
        rounded-lg bg-inherit "
            />
            </button>
          </Link>
         <div className="flex justify-between"> 
          <div className=" flex flex-col ">
           <div className="flex ml-2">
             <img src={item?.image}  className=" w-[40px] h-[40px] rounded-full"/>
             <span className="m-2">{item?.name?.slice(0,29)}</span></div>
          <span className=" ml-2 p-2 overflow-x-auto max-w-screen-sm">{item?.title?.slice(0,40)}</span>
          </div>
         

         <div>
          <span>
           <EllipsisVertical/>
          </span>
          </div> 
         </div>
        </button>
      ))}
    </div>
  );
}

export default SideVideo;
