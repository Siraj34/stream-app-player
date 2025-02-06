import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectPlayList } from '../reducer/VideoReducer'
import { useParams } from 'react-router-dom'
import axios from "axios";

export default function PlayVideo() {
  const {id} =useParams()
    const list = useSelector(selectPlayList)
    const [message, setmessage] = useState([]);

    useEffect(() => {
        async function get() {
          try {
            const { data } = await axios.get(
              `http://localhost:4000/api/playLists/add/${id}`
            );
            setmessage(data);
           
          } catch (error) {
            console.log(error);
          }
        }
        get();
      }, [id]);
  return (
    <div className=' h-full'>
        <div className=' w-800-[px] h-[500px] '>
            <video className=' w-full h-[350px]' controls  src={message?.videoUrl} poster={message?.imageUrl} />
        </div>

        <div>
              {list?.map((item) => (
                <button className=" m-2 " key={item}>
                  <img
                    src={item?.imageUrl}
                    className="md:h-[300px] md:w-[300px] h-[200px] w-[200px] 
                      rounded-lg bg-inherit "
                  />
                

                  <div className=" flex flex-col ">
                    <div className="flex ml-2">
                      <img
                        src={item?.image}
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
