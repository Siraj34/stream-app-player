import React, { useContext } from "react";
import { Link } from "react-router-dom";


import { AlbumContext, MusicContext } from "../context/ContextAl";
import { useSelector } from "react-redux";
import { selectUser } from "../reducer/VideoReducer";

function Home() {
  const { Data } = useContext(MusicContext);
  const login =useSelector(selectUser)
     

  
  return (
    <div className="j justify-between overflow-y-auto h-screen border-s-rose-900 md:grid grid md:grid-cols-4 grid-cols-2 ">
      {Data?.map((item, keys) => (
        <button key={keys} className=" m-2  ">
          <Link to={`/room/${item?._id}/${item?.postBy}`}>
            <img
              src={item?.imageUrl}
              className="md:h-[300px] md:w-[300px] h-[200px] w-[200px] 
        rounded-lg bg-inherit "
            />
          </Link>
          <div className=" flex flex-col ">
           <div className="flex ml-2">
             <img src={item?.image}  className="w-[40px] h-[40px] rounded-full m-2"/>
             <span className="m-2">{item?.name?.slice?.(0,14)}</span></div>
         <div className="flex"><span className=" ml-2 p-2">{item?.title?.slice?.(0,14 )}</span></div> 
          </div>
        </button>

      ))}
    </div>
  );
}

export default Home;
