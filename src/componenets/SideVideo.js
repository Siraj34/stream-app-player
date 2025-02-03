import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { EllipsisVertical, Pointer } from "lucide-react";
import { getHistory, getVideo, selectUser, selectVideo } from "../reducer/VideoReducer";
import { useDispatch, useSelector } from "react-redux";
import { MusicContext } from "../context/ContextAl";

function SideVideo() {
  const { play, setplay, controls, setcontrols, Data } =
    useContext(MusicContext);
    const dispatch = useDispatch()
    const video =useSelector(selectVideo)
     const login =useSelector(selectUser)
    
    
    const place= async (item) => {
      fetch(`http://localhost:4000/api/orders/post`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body:JSON.stringify({
          name: item?.name,
          title: item?.title, 
          
          imageUrl: item.imageUrl,
            userName: login?.name,
            user: login?.email,
            image:login?.imageUrl
        })
    
      },).then((res) => {
        res.json().then((data) => {
          localStorage.setItem("history", JSON.stringify(data));
         dispatch(getHistory(data))
         
          console.log(data, "oooooooo");
        });
      });
    };

    
  console.log(video, "tttttttt history");
  return (
    <div className="md:w-[350px] w-full h-[800px] flex flex-wrap justify-center   ">
      {Data?.map((item, keys) => (
        <button key={keys} className="   " onClick={()=>place(item)}>
          <Link to={`/room/${item._id}/${item?.postBy}`}>
            <button><img
              src={item?.imageUrl}
              className="md:-h-[300px] ]  md:w-[300px] h-[260px] w-screen
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
