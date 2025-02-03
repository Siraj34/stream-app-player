import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MusicContext } from "../context/ContextAl";
import { Italic, PlusCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { selectHistory, selectUser, selectVideo } from "../reducer/VideoReducer";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function HistoryScreen() {
  const { Data, controls } = useContext(MusicContext);
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const history = useSelector(selectHistory);
  const [data, setGetData] = useState([]);
  const params =useParams()
  const {id} = params
  const login = useSelector(selectUser);

  

  
  useEffect(() => {
    fetch(`http://localhost:4000/api/user/order/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result,'uuuu');
        setUser(result.user);
        setPosts(result.post);

        setIsFollow(true);
      });
  }, [isFollow]);


  useEffect(() => {
    const submitbutton = () => {
      fetch("http://localhost:4000/api/orders/history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }).then((res) =>res.json())
      
        .then((data) => {
            setGetData(data)
          if (data.error) {
            console.log(data.error);
            console.log(data, "hhh99jjjjjjj");
           
          } else {
            toast.success("Successfully Posted");
          }
        })
        .catch((err) => console.log(err));
    };
    submitbutton();
  }, []);
  

console.log(data, "history11111");
  return (
    <div className=" bg-gray-900 h-full overflow-y-auto  ">
       <div className="flex m-3 p-3 text-white">
        <div className="m-2 p-2 text-2xl font-semibold   ">
        History</div>  </div> 
      <div className="j m-3 p-3 w-full text-white font-bold  md:flex md:grid-cols-1 flex  overflow-y-auto">
         {data?.map((item)=>(
      <button className=" m-2 text-white " key={item}>
      <div>
        <img
          src={item?.imageUrl}
          className="md:min-h-[150px] md:min-w-[150px] h-[100px]  w-[100px]  "
        />

        <div className=" flex flex-col ">
          <div className="flex ml-2">
            <span className="m-2">{item?.name?.slice(0,10)}</span>
          </div>
        
        </div>
      </div>
    </button>

         ))}
          
      
      </div>
    </div>
  );
}
