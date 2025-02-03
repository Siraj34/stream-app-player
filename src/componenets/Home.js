import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";


import { AlbumContext, MusicContext } from "../context/ContextAl";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, getVideo, selectUser } from "../reducer/VideoReducer";

function Home() {
  const { Data } = useContext(MusicContext);
  const [data,setData]=useState()
  const login =useSelector(selectUser)
     const dispatch = useDispatch()

     
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
 
      
  
  return (
    <div    className="j justify-between overflow-y-auto h-screen border-s-rose-900 md:grid grid md:grid-cols-4 grid-cols-2 ">
      {Data?.map((item, keys) => (
        <button key={keys} className=" m-2 " m-2 onClick={()=>place(item)} >
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
