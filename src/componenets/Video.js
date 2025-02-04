import React, { useContext, useEffect, useState } from "react";


import { Await, Link, useParams } from "react-router-dom";

import {
  ArrowBigDown,
  ArrowBigUp,
  ArrowUp01,
  ArrowUp10,
  ArrowUpAzIcon,
  BotOff,
  DoorClosed,
  Download,
  EllipsisVertical,
  FileAudio,
  ForwardIcon,
  Heart,
  HeartOff,
  HeartOffIcon,
  HomeIcon,
  IdCardIcon,
  Link2Icon,
  ListStart,
  Menu,
  MessageCircle,
  MessageCircleHeart,
  MessageCircleOff,
  MessageCirclePlusIcon,
  Play,
  PlayCircleIcon,
  Repeat,
  Repeat2,
  SearchIcon,
  SendHorizonalIcon,
  Share2,
  Share2Icon,
  SkipForwardIcon,
  StepForwardIcon,
  User2,
  Volume,
  X,
  XCircle,
} from "lucide-react";
import { timer } from "../utils/timer";
import { WhatsappShareButton } from "react-share";
import toast, { ToastBar } from "react-hot-toast";
import axios from "axios";
import SideVideo from "./SideVideo";
import { useDispatch, useSelector } from "react-redux";
import {
  getShare,
  getVideo,
  selectShare,
  selectUser,
  selectVideo,
} from "../reducer/VideoReducer";
import { compactNumberFormat } from "../utils/Num";
import dayjs from "dayjs";
import { MdVerticalAlignTop, MdVerticalSplit } from "react-icons/md";
import { SlDislike, SlLike } from "react-icons/sl";
import { BiMessage, BiMessageAdd, BiSend, BiShare, BiStreetView } from "react-icons/bi";
import { HiOutlineViewList } from "react-icons/hi";
import { Audio } from "react-loader-spinner";
import { MusicContext } from "../context/ContextAl";

function Video() {
  const params = useParams();
  const { id } = params;
  const { userId } = params;
  
  const login = useSelector(selectUser);
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [imassge, setimassge] = useState([]);
  const [get, setGet] = useState([]);
  const [vdata, setvdata] = useState([]);
  const [like, setlike] = useState(false);
  const [view, setView] = useState([]);
  const {
    audio,
    handSkip,
    controls,
    songOne,
    songTwo,
    playing,
    setPlaying,
    volume,
    setvolume,
    inputVolume,
    addVolume,
    repeatAll,
    repeat,
    Data,
    timeHndel,
    handload,
    endAudio,
    duration,
    currentTime,
    handleTime,
    handVolume,
    messages,
    setMessages,
    ListMessages,
    play,
    setplay,
  } = useContext(MusicContext);

  const FILE_URL = `${window.location.href}/${Data[controls]?.videoUrl}`;

  const [videoLink, setVideoLink] = useState("");
  const [data, setData] = useState([]);
  const [comments, setComments] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setVideoLink(`${window.location.href}`);
  }, []);

  const copyLink = () => {
    navigator.clipboard
      .writeText(videoLink)
      .then(() => toast.success("Link copied to clipboard"));
  };

  

  const DawnloadFile = (url) => {
    fetch(url)
      .then((responce) => responce.blob())
      .then((blob) => {
        const resUrl = window.URL.createObjectURL(new Blob([blob]));

        const fileName = url.split("/").pop();
        const upload = document.createElement("a");
        upload.href = resUrl;
        upload.setAttribute("download", fileName);
        document.body.appendChild(upload);
        upload.click();
        upload.remove();
      });
  };

  useEffect(() => {
    const getfetch = async () => {
      const { data } = await axios.get(
        `https://stream-data-app.vercel.app/api/movies/room/${id}`
      );
      setvdata(data);
    };
    getfetch();
  }, [id]);

  const addLikes = () => {
    fetch(`https://stream-data-app.vercel.app/api/movies/like/${id}/${login?._id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((result) => {
        sessionStorage.getItem("like", JSON.stringify(result));
        setData(result);
        toast.success("Successfully liked");
        setlike(true);
        console.log(result);
      });
  };

  const addDisLikes = () => {
    fetch(
      `https://stream-data-app.vercel.app/api/movies/dislike/${id}/${login?._id}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer" + localStorage.getItem("jwt", JSON.stringify()),
        },
        body: JSON.stringify({}),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        localStorage.getItem("dislike", JSON.stringify(result));
        setData(result);
        toast.success("Successfully disliked");
        setlike(false);
        console.log(result);
      });
  };

  async function CommenSend(e) {
    e.preventDefault();

    try {
      await axios.post(`https://stream-data-app.vercel.app/api/comments/post`, {
          videoId: Data[controls]?._id,
          message: comments,
          image: login?.imageUrl,
          name: login?.name,
          postBy: login?._id,
        })
        .then((res) => {
          setComments(res);
        });
      setComments("");
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    async function get() {
      const { data } = await axios.get(
        `https://stream-data-app.vercel.app/api/comments/get/${id}`
      );

      localStorage.setItem("commentSEND", JSON.stringify(data));
      setimassge(data);
    }
    get();
  }, [id]);
  console.log(imassge, "testf55");

 

  const followUser = (userId) => {
    fetch(`https://stream-data-app.vercel.app/api/user/follow`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(true);
      });
  };

  const unfollowUser = (userId) => {
    fetch(`https://stream-data-app.vercel.app/api/user/unfollow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        setIsFollow(false);
      });
  };

  useEffect(() => {
    fetch(`https://stream-data-app.vercel.app/api/user/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result,"mooon");
        setUser(result.user);
        setPosts(result.post);
        if (
          result?.user?.followers?.includes(
            JSON.parse(localStorage.getItem("login2"))?._id
          )
        ) {
          setIsFollow(true);
        }
      });
  }, [isFollow]);

  useEffect(() => {
    const addViwes = async () => {
      fetch(`https://stream-data-app.vercel.app/api/movies/views/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }).then((res) => {
        res.json().then((data) => {
          localStorage.setItem("views", JSON.stringify(data));
          setView(data);
          console.log(data, "oooooooo");
        });
      });
    };

    addViwes();
  }, [id]);



  console.log(posts, "data ta");
  return (
    <div
      className=" relative  right-0 left-0 overflow-y-auto 
      w-full h-full  md:bg-black    bg-black "
  >
     
        <div className=" md:relative  relative  top-0  bg-slate-600">
          {" "}
          <a>
            <div >
              <video 
                controls
                ref={audio}
                src={vdata?.videoUrl}
                poster={vdata?.imageUrl}
                onLoadStart={handload}
                onTimeUpdate={timeHndel}
                onEnded={endAudio}
                className="md:h-[500px]  md:w-[900px]  h-[500px]  w-fit
         bg-inherit  "
                width={`100%`}
              />
            </div>
          </a>
          <div
            className={` hidden justify-between absolute  left-[0px] m-2 right-[0px]  top-[420px] text-yellow-50 text-xl'
           '} `}
          >
            <button onClick={addVolume} className=" ">
              <Volume />
            </button>

            <div className="m-2 h-4 ">{timer(currentTime)}</div>
            <div className="m-2">
              <input
                className=" "
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => handleTime(e.target.value)}
              />
            </div>
            <div className="m-2 h-4 ">{timer(duration)}</div>
          </div>
          <strong className="  m-2 p-2 justify-start  flex flex-col md:m-1 absolute max-sm:-left-[8px]  max-sm:-right-[8px]  top-[450px] ">
            {inputVolume ? (
              <div className="">
                <div onClick={handVolume}>
                  <div className="flex   md:ml-3 md:h-[50px]    md:max-w-[300px] max-w-[150px]   ">
                    <div className="bg-orange-600 flex  p-2 rounded-full border-y-4 border-orange-400 ">
                      <input
                        className="md:max-w-[200px]  max-w-[150px] m-2 flex flex-col"
                        type="range"
                        value={volume}
                        max={100}
                        min={0}
                        onChange={(e) => setvolume(Number(e.target.value))}
                      />
                      <button className=" rounded-full  max-h-10 max-w-[30px] text-center bg-gray-200 ">
                        {volume}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </strong>
          <div
            className=" justify-between md:justify-between absolute md:left-[0px] left-[0px] 
            right-[0px] m-2 md:right-[0px] top-12 md:flex flex"
          >
            <div className="md:flex flex">
              <span className="text-white" onClick={repeatAll}>
                {playing ? <ListStart /> : <Repeat2 />}/{repeat.length}
              </span>
            </div>
            <div className="md:flex flex">
              <Link to={"/"}>
                <span className=" text-white font-bold text-4xl m-1">🔙</span>
              </Link>
            </div>

            <div className="md:flex flex">
              <span className="">
                {!playing ? (
                  <button
                    onClick={songOne}
                    className=" text-white
           bg-black font-bold h-10 w-10 text-xl   hover:bg-slate-300 text-center m-1"
                  >
                    ▶
                  </button>
                ) : (
                  <button
                    onClick={songTwo}
                    className=" text-white
            bg-black font-bold h-10 w-10 text-xl   hover:bg-slate-300 text-center m-1"
                  >
                    ⏸
                  </button>
                )}
              </span>
            </div>
          </div>
          <div className=" flex  p-5 m-5 rounded-xl   text-white justify-between overflow-y-auto overflow-x-auto -left-0 -right-0   max-w-fulf top-[300px]">
            <button
              className=" font-bold flex  m-3 p-3  h-16 w-24 text-center rounded-2xl "
              onClick={() => {
                if (isFollow) {
                  unfollowUser(user?._id);
                } else {
                  followUser(user?._id);
                }
              }}
            >
              <span className="flex flex-col">
                {isFollow ? (
                  <div className=" ">UnSubscribe</div>
                ) : (
                  <div className="bg-black ">Subscribe</div>
                )}
                <div className="flex flex-col">
                  <span>{user?.followers?.length}</span>
                </div>
              </span>
            </button>

            <>
              <div className=" font-bold flex  flex-col m-3 p-3   text-center rounded-2xl">
                <button className=" text-red-600  " onClick={() => addLikes()}>
                  {" "}
                  <SlLike className="text-2xl" />
                </button>
                <span className="m-1 ">{vdata?.likes} </span>
              </div>

              <div className="font-bold flex  flex-col m-3 p-3   text-center rounded-2xl">
                <button className="  " onClick={addDisLikes}>
                  <SlDislike className=" text-2xl" />
                </button>
                <span className="m-1">{vdata?.dislikes}</span>
              </div>
            </>

            <button className=" h-18 w-24  font-bold   m-3 p-3 flex  flex-col text-center rounded-2xl">
              <button>
                <BiMessage className="text-2xl" />
              </button>
              <span className="m-1">{imassge?.length}</span>
            </button>
            <button className=" font-bold h-18   m-3 p-3 flex flex-col    text-center rounded-xl">
              <span>Views</span>
              <button className="m-1">{vdata?.views}</button>

              <span className="text-sm">
                {dayjs(vdata?.createdAt).format("DD/MM/YYYY")}
              </span>
            </button>

            <div className=" font-bold flex   m-3 p-3 flex-col  h-16 w-24 text-center rounded-2xl">
              <span >
                <WhatsappShareButton
                  className="  "
                  url={videoLink}
                  title="best video link share.."
                >
                  <span className="">
                    <Share2Icon className="m-1" />{" "}
                  </span>
                  <span className="">share</span>
                </WhatsappShareButton>{" "}
              </span>
            </div>

            <div className=" hidden text-white font-bold  m-3 p-3 flex-col">
              <span className="  ">
                <button onClick={() => handSkip(true)}>
                  <ArrowBigUp />
                </button>
              </span>

              <span className="  ">
                <button onClick={() => handSkip(false)}>
                  <ArrowBigDown />
                </button>
              </span>
            </div>
          </div>
          <div className="absolute m-2 left-5 right-5 top-0 text-white">
            <div className="flex text-green-600 font-semibold touch-pan-up text-sm uppercase md:max-w-[300px] max-w-[280px]">
              Video Stream{" "}
            </div>
            <span onClick={copyLink} className="flex text-blue-800">
              <button className="flex ml-2 text-center p-1  bg-yellow-200 font-bold h-6 w-24 ">
                link / {""} <Link2Icon />
              </button>
            </span>
          </div>
          <div className="left-0 right-0 text-white top-[555px] flex justify-between">
            <button className="flex m-3 p-2 ">
              <span className=" text-white">
                <Download />
              </span>
              <span className="ml-1" onClick={() => DawnloadFile(FILE_URL)}>
                Download
              </span>
            </button>
            <div className="flex m-3 p-2 ">
              <span className="">💛💚💙💜</span>
            </div>

            <div className="flex m-2 ml-3 ">
              <span className="text-2xl m-2">💫</span>
            </div>
          </div>
        </div>

        <div className=" h-[240px] w-full bg-slate-100  overflow-y-auto">
          <div className="m-2 p-2 justify-between flex ">
            <div>
              <div className="flex">
                <span className="m-2 rounded-full w-[40px] h-[40px] flex">
                  <img className="rounded-full" alt="" src={vdata?.image} />
                  <span className=" m-2">{vdata?.userName}</span>
                </span>
              </div>
              <div>
                <span className="m-2  overflow-y-auto text-black font-bold">
                  Name : {vdata?.name?.slice(0, 40)}
                </span>
            
              </div>
              <div className="">
                <span className="m-2 h-[150px] overflow-y-auto">
                  <div className="text-black font-bold flex"> Title :</div>{" "}
                  {vdata?.title}
                </span>
               
              </div>
              <div className="m-2 text-xs text-black font-bold flex">
                {" "}
                <span className="text-black m-1"> Views</span>
                <div className="m-1">{vdata?.views}</div>
                <span className="text-black m-1"> {dayjs(vdata?.createdAtt).format("DD/MM/YYYY")}</span>
              </div>
            </div>
            <div className=" h-[60px] bg-black ">
              <button className="flex ">
                <button className="h-10 w-24 text-center 
                 bg-black text-white uppercase p-2 font-bold">
                  Subscribe
                  <img  src={vdata?.imageUrl} alt="" className=" w-[20px] h-[20px]"/>
                  
                  </button>
                  <Audio
                        height="60"
                        width="60"
                        radius="9"
                        color="green"
                        ariaLabel="three-dots-loading"
                        wrapperStyle
                        wrapperClass
                      />
              
              </button>
            </div>
          </div>
        </div>

        <div className=" bg-green-500 h-[100px]  justify-center items-center ">
          <div className="m-2 p-2">
            <div className=" flex justify-between top-11 bg-slate-600 p-3 m-3 text-black font-bold  ">
              <div className="flex m-2">
                <button onClick={ListMessages} className=" flex  text-white ">
                  {messages ? <XCircle /> : <Menu />}
                </button>{" "}
              </div>
              <button className=" flex rounded-xl bg-slate-300 text-black font-bold h-10 w-28 m-1  text-center" onClick={ListMessages}>
                
                <button className="m-1">Message</button>
                <button className="m-1">{imassge?.length}</button>
              </button>
              <div className="flex m-2">
                <MessageCircleHeart />
              </div>
            </div>
          </div>
        </div>
        <div className=" text-white">
          {!messages ? null : (
            <div
              className=" 
        "
            >
              <div>
               
                <div></div>
                <div className=" h-[400px] bg-slate-500 text-black font-bold overflow-y-auto  ">
                  {imassge?.map((item) => (
                    <div className="m-2 p-2 justify-between flex ">
                      <div>
                        <div className="flex">
                          <span className="m-2 rounded-full w-[40px] h-[40px] flex">
                            <img
                              className="rounded-full"
                              alt=""
                              src={item?.image}
                            />
                            <span className=" m-2">{item?.name}</span>
                          </span>
                        </div>
                        <div>
                          <span className="m-2">{item?.message}</span>
                        </div>
                        <div className="m-2 text-xs text-slate-900">
                          {" "}
                          <span>
                            {" "}
                            {dayjs(item?.createdAtt).format("DD/MM/YYYY")}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="m-2">
                          <EllipsisVertical />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className=" flex justify-around bg-purple-400">
                  <div className="flex m-2">
                    <button
                      onClick={ListMessages}
                      className=" flex  text-white "
                    >
                      {messages ? <XCircle /> : <Menu />}
                    </button>{" "}
                  </div>
                  <div className="">
                    <div className="flex">
                    <div className="flex bg-red-300">
                      <input
                        type="text"
                        value={comments}
                        placeholder="Message"
                        onChange={(e) => setComments(e.target.value)}
                        className="p-2 h-10 w-[200px] bg-slate-400 text-black font-semibold"
                      />
                      <button >
                        <div className="flex">
                          <SearchIcon />
                        </div>
                      </button>
                    
                    </div>
                      <button onClick={CommenSend}>
                        <div className="flex ml-2">
                          <BiSend className="text-2xl"/>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="flex m-2">
                    <MessageCircleHeart />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      
    </div>
  );
}

export default Video;
