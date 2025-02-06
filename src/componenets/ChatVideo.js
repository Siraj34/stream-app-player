import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectPlayList } from '../reducer/VideoReducer';
import { MusicContext } from '../context/ContextAl';
import { ArrowBigDown, ArrowBigUp, ArrowLeft, ArrowRight, ListStart, Repeat, Volume } from 'lucide-react';
import { timer } from '../utils/timer';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';

export default function ChatVideo() {
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
      list,
      setcontrols,
    } = useContext(MusicContext);
 const [data, setData] = useState([])
 const {id} = useParams()
 const [isFullscreen, setIsFullscreen] = useState(false);
 //const list =useSelector(selectPlayList)

    useEffect(() => {
        async function get() {
          try {
            const { data } = await axios.get(
              `https://stream-data-app.vercel.app/api/chats/chat/${id}`
            );
          
            setData(data)
          } catch (error) {
            console.log(error);
          }
        }
        get();
      }, [id]);


      const handleClickFullScreen = useCallback(() => {
        if (isFullscreen) {
       
          if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msExitFullscreenElement
          ) {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }
            
          }
         
        } else {
          audio.current?.requestFullscreen();
        }
        setIsFullscreen((isFullscreen) => !isFullscreen);
      }, [isFullscreen, setIsFullscreen]);

      const handleKeyPress = useCallback(
        (event) => {
          if (document.activeElement?.tagName.toLocaleLowerCase() === "input")
            return;
    
          const { key } = event;
    
          switch (key.toLocaleLowerCase()) {
            case " ":
            
              songOne()
              songTwo()
            default:
              return;
          }
        },
        [songOne,songTwo]
      );
    
      useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
    
        return () => {
          window.removeEventListener("keydown", handleKeyPress);
        };
      }, [handleKeyPress]);
    
    
  return (
    <div className=' relative h-screen w-full overflow-y-auto bg-slate-700'>
       <div>
        <div className=' bg-zinc-800'>
               <video className='h-[400px] w-full' src={list?.post[controls]?.videoUrl}    
               ref={audio}
            
              poster={list?.post[controls]?.imageUrl}
              onLoadStart={handload}
              onTimeUpdate={timeHndel}
              onEnded={endAudio} />
        </div>
        </div> 
        <div
          className={`${!playing ?(` bg-zinc-800 flex justify-around
             absolute  left-[0px]  right-[0px]  top-[380px]
              text-yellow-50 text-xl
           `):((` bg-zinc-800 hidden justify-around
            absolute  left-[0px]  right-[0px]  top-[380px]
             text-yellow-50 text-xl
          `))}`}
        >
          <button onClick={addVolume} className=" ">
            <Volume/>
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

          <div className="flex gap-2 p-3 items-center">
            <button
              className="opacity-70 translation-opacity hover:opacity-100"
              onClick={handleClickFullScreen}
            >
              {isFullscreen ? <MdFullscreenExit className=' text-2xl ' /> : <MdFullscreen  className='text-2xl'/>}
            </button>
          </div>
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
              {playing ? <ListStart /> : <Repeat />}/{repeat.length}
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

        <div>
        <div className=" flex justify-around  absolute text-white font-bold  m-3 p-3  left-0 right-0 top-32">
            <span className="  ">
              <button onClick={() => handSkip(true)} className='m-2 p-2 text-xl'>
                <ArrowLeft />
              </button>
            </span>
                 
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

            <span className="  ">
              <button onClick={() => handSkip(false)} className='p-2 m-2 text-xl'>
                <ArrowRight />
              </button>
            </span>
          </div>
          </div>


        <div className='m-3 p-3 absolute top-[500px] flex flex-col'>
              {list?.post?.map((item,index) => (
                <button className=" m-2 " key={index}  onClick={()=>setplay(index)}>
                 <img
                
                    src={item?.imageUrl}
                    className="md:h-[300px] md:w-[300px] h-[200px] w-[200px] 
                      rounded-lg bg-inherit "
                  />
                

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
    
  )
}
