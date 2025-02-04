import React, { useContext, useEffect, useState } from "react";
import { BiAlbum, BiLike, BiMenu, BiUser, BiUserPlus } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { CgAdd, CgNametag } from "react-icons/cg";
import { FaThumbsUp } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FiDelete, FiMessageCircle } from "react-icons/fi";
import { GrAction, GrChannel } from "react-icons/gr";
import { ImDatabase, ImImage } from "react-icons/im";

import { Link, useNavigate, useParams } from "react-router-dom";
import { compactNumberFormat } from "../utils/Num";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { selectUser } from "../reducer/VideoReducer";

import { CreativeCommonsIcon, MessageCircle, Subscript, SubscriptIcon, ThumbsUp, Video, View } from "lucide-react";
import { MusicContext } from "../context/ContextAl";

export default function UserChannel() {
  const { play, setplay, controls, setcontrols, Data } =
    useContext(MusicContext);
  const login = useSelector(selectUser);
  const [isupdate, setisupdate] = useState(false);
  const params = useParams();
  const { id } = params;
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [comments, setComment] = useState([]);
  const [deletes, setDeletes] = useState([]);

  const router = useNavigate();

  const handle = () => {
    setisupdate(!isupdate);
  };

  useEffect(() => {
    fetch(`https://stream-data-app.vercel.app/api/user/movies/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUser(result.user);
        setPosts(result.post);

        setIsFollow(true);
      });
  }, [isFollow]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/user/comment/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setComment(result);
      });
  }, []);

  const adddelete = (_id) => {
    fetch(`https://stream-data-app.vercel.app/api/movies/delete/${_id}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setDeletes(result);
        if (result.error) {
          console.log(result.error);
        } else {
          alert("Successfully Posted");
        
        }
      });



  };

  
   const item  =  posts.map((item)=>(item?.likes?.length))
 
  console.log(posts, "kkkk");
  return (
    <div className=" md:min-h-screen  flex flex-col  bg-purple-500">
      <div>
      <div className=" flex   justify-start md:w-[400px] md:min-w-max-[200px]">
        <h1 className=" m-3 text-7xl">
          <img
            src={login?.imageUrl}
            alt=""
            className="m-2 w-[60px] rounded-full"
          />
        </h1>
        <h1 className="m-2  text-4xl">{user?.name}</h1>
     
      </div>
        <button className="flex ml-3"> 
          <div>@channel_Name_User </div>
          <span className="ml-2"> <CgAdd/></span>
          </button>
      </div>
      <table>
      <tbody className="flex justify-around min-w-max-[200px] text-black font-bold text-xl ">
        <div className="m-2">
          <h1><GrChannel/></h1>
        </div>

        <div className="m-2">
        
          <h1> <ThumbsUp/></h1>
        </div>

        <div className="m-2">
          <h1><View/></h1>
        </div>
        <div className="m-2">
       
          <h1><Subscript/></h1>
        </div>
      </tbody>
 
      <tbody className="flex justify-around  min-w-max-[200px] text-black font-bold ">
        <div className="m-2">
        <h1>comment</h1>
          <h1>{comments?.post?.length}</h1>
        </div>

        <div className="m-2">
          <h1> Like</h1>
       
        <h1>{item.length} </h1>
        
        
          
        </div>

        <div className="m-2">
           <span>Views</span>
          <h1>{item?.length}</h1>
         
        </div>
        <div className="m-2">
        <h1>Subscribe</h1>
          <h1>{user?.followers?.length}</h1>
        </div>
      </tbody>
 
      </table>

      <div className=" overflow-y-auto h-[600px]">
        <div className="flex  justify-between text-black border-b-2 border-blCack  md:m-0 m-2 ">
          <button>
            <ImImage className="md:w-24 md:h-10 overflow-y-auto" />
          </button>
          <button>
            <ThumbsUp className="md:w-24 md:h-10 overflow-y-auto" />
          </button>
          <button>
            <View className="md:w-24 md:h-10 overflow-y-auto" />
          </button>
          <button>
            <ImDatabase className="md:w-24 md:h-10 overflow-y-auto" />
          </button>
          <button>
            <FiDelete className="md:w-24 md:h-10 overflow-y-auto" />
          </button>
        </div>
        {posts?.map((item) => (
          <div>
            <div className="flex  justify-between text-black border-b-2 border-black  md:m-0 m-2 ">
            <button><Link to={`/room/${login?._id}`}> 
                <img
                  src={item?.imageUrl}
                  alt=""
                  className="md:w-24 md:m-2 m-0  md:h-10 h-10 w-10 overflow-y-auto"
                />   
                </Link>
                </button>
           
              <button
                className="rounded-xl   m-2 
          font-extrabold text-center overflow-y-auto md:h-16 md:w-24 text-sm w-10 "
              >
                {item?.likes}
              </button>
              <button
                className="rounded-xl   m-2 
          font-extrabold text-center overflow-y-auto  w-10 md:h-10 md:w-24 text-sm "
              >
                {item?.views}
              </button>
              <button
                className="rounded-xl   m-2 
          font-extrabold text-center overflow-y-auto md:h-10 md:w-24  w-10 text-sm "
              >
                {item?._id}
              </button>
              <button onClick={() => adddelete(item?._id)}>
                <FiDelete className="md:w-24 md:h-10 overflow-y-auto" />
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
