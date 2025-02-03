import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MusicContext } from "../context/ContextAl";
import { Italic, PlusCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { selectUser } from "../reducer/VideoReducer";
import HistoryScreen from "./HistoryScreen";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function FollowingScreen() {
   const { Data,controls} = useContext(MusicContext);
  const [data, setData] = useState([]);
 const [getData, setGetData] = useState()


  const login = useSelector(selectUser)
  


  useEffect(() => {
    const submitbutton = () => {
      fetch("http://localhost:4000/api/movies/myfollwingpost", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }).then((res) =>res.json())
      
        .then((data) => {
            setData(data)
          if (data.error) {
            console.log(data.error);
            console.log(data, "hhh99");
           
          } else {
            toast.success("Successfully Posted");
          }
        })
        .catch((err) => console.log(err));
    };
    submitbutton();
  }, []);

useEffect(() => {
    const submitbutton = () => {
      fetch("http://localhost:4000/api/movies/myfollowers", {
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
            console.log(data, "hhh99");
           
          } else {
            toast.success("Successfully Posted");
          }
        })
        .catch((err) => console.log(err));
    };
    submitbutton();
  }, []);
  
  console.log(Data,'hhhhhhhh')
  return <div className=" bg-gray-900 h-full overflow-y-auto  ">
        <div>
                 <div className=" text-white flex justify-start md:w-[400px] md:min-w-max-[200px]">
                   <h1 className=" m-3 text-7xl">
                     <img
                       src={login?.imageUrl}
                       alt=""
                       className="m-2 w-[60px] rounded-full"
                     />
                   </h1>
                   <h1 className="m-2  text-4xl">{login?.name}</h1>
                
                 </div>
                   <button className="flex ml-3 text-white"> 
                     <div>@channel_Name_User </div>
                     <span className="ml-2"><Link to={`/channelMovies/${login?._id}`}><PlusCircle/></Link> </span>
                     </button>
                 </div>

                 <div className="flex  text-white"><div className="m-2 p-2 text-2xl font-semibold   ">Subscriptions</div>  </div> 
     <div className="j m-3 p-3 text-white font-bold  md:flex md:grid-cols-1 flex  overflow-y-auto">
   
      {getData?.map((item)=>(
         <button  className=" m-2 ">
         
            <div>
            <img
              src={item?.imageUrl}
              className="md:h-[150px] md:w-[150px] h-[100px]  w-[100px] rounded-full "
            />
       
          <div className=" flex flex-col ">
           <div className="flex ml-2">
             
             <span className="m-2">{item?.name}</span></div>
         <div className="flex"><span className=" ml-2 p-2">{item?.email}</span></div> 
          </div>
          </div> 



          

          
            
          
        </button>
      ))}
       

     </div>

     
  </div>;
}
