import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayVideo, selectPlayList, selectUser } from "../reducer/VideoReducer";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ImGoogle } from "react-icons/im";
import { BsPlus } from "react-icons/bs";
import { ArrowBigLeft, PenTool, PlayIcon } from "lucide-react";
import { BiPlay } from "react-icons/bi";

export default function PlayList() {
  const list = useSelector(selectPlayList);
  const login = useSelector(selectUser);
  const params = useParams();
  const { id } = params;
  const [play, setplay] = useState([]);
  const [message, setmessage] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    const submitbutton = () => {
      fetch(`https://stream-data-app.vercel.app/api/chats/chat/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())

        .then((data) => {
          setplay(data);
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

  const chatSend = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://stream-data-app.vercel.app/api/playLists/post",
        {
          chatId: play?._id,
          videoUrl: play.videoUrl,
          imageUrl: play.imageUrl,
          title: play?.title,
          musicName: play?.musicName,
          name: play?.name,
          userName: login?.name,
          user: login?.email,
          image: login?.imageUrl,
          postBy: login?._id,
        }
      );

      console.log(data, "playlist55");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function get() {
      try {
        const { data } = await axios.get(
          `https://stream-data-app.vercel.app/api/playLists/play/${id}`
        );
      
       
      } catch (error) {
        console.log(error);
      }
    }
    get();
  }, [id]);


  useEffect(() => {
    async function get(params) {
      try {
        const {data} = await axios.get(`https://stream-data-app.vercel.app/api/user/chat/${login?._id}`)
         dispatch(getPlayVideo(data))
      setmessage(data?.post);
      toast.success('SUCCESS NAME CREATE ...')
    }
      catch (error) {
        console.log(error)
      }
     }
     get()
    }, [])
  

  console.log(message, "12345");
  return (
    <div>
      <div className="h-full overflow-y-auto flex bg-yellow-700">
        <div className=" w-full ">
          <div>
            <img src={play?.imageUrl} alt="" className=" w-full h-[250px]" />
          </div>
          <div className="flex flex-col">
            <span className="m-2">{play?.name}</span>
            <div className="flex">
              <span>
                <img src={play.image} alt="" className=" h-10 w-10 m-1" />
              </span>
              <span className="m-4">{play?.userName}</span>
            </div>
            <div className="flex">
              <span className="m-2">PlayList</span>
              <span className="m-2">Private</span>
              <span className="m-2">{play?.length}</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between m-2 p-2 ">
              <button className="flex bg-white text-black font-bold p-2 text-center  h-12 w-[200px]">
                <span className="m-1 text-xl">
                  <BiPlay className=" text-4xl " />
                </span>
                <span className="m-1 text-2xl">Play All</span>
              </button>
              <div>
                <div className="flex">
                  <button className="m-1 text-xl">
                    <BsPlus onClick={chatSend} />
                  </button>
                  <span className="m-1 text-xl">
                    <PenTool />
                  </span>
                  <span className="m-1 text-xl">
                    <ArrowBigLeft />
                  </span>
                </div>
              </div>
            </div>
            <div>
              {message.map((item) => (
                <button className=" m-2 " key={item}>
                 <Link to={`/playList/${item?._id}`}> <img
                    src={item?.imageUrl}
                    className="md:h-[300px] md:w-[300px] h-[200px] w-[200px] 
                      rounded-lg bg-inherit "
                  />
                  </Link>

                  <div className=" flex flex-col ">
                    <div className="flex ml-2">
                      <img
                        src={item?.videoName}
                        className="w-[40px] h-[40px] rounded-full m-2"
                      />
                      <span className="m-2">
                        {item?.musicName?.slice?.(0, 14)}
                      </span>
                    </div>
                    <div className="flex">
                      <span className=" ml-2 p-2">
                        {item?.title?.slice?.(0, 14)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
