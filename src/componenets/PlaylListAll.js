import React from 'react'
import { useSelector } from 'react-redux';
import { selectPlayList } from '../reducer/VideoReducer';
import { Link } from 'react-router-dom';

export default function PlaylListAll() {
     const list = useSelector(selectPlayList);

     console.log(list ,'playlist 77')
  return (
    <div>
          <div>
            <div className=' className="m-2 p-2 text-2xl font-semibold'>PlaylList Playl</div>
              {list?.post?.map((item) => (
                <button className=" m-2 " key={item}>
                 <Link to={`/play/${item?._id}`}> <img
                    src={item?.imageUrl}
                    className="md:h-[300px] md:w-[300px] h-[200px] w-[200px] 
                      rounded-lg bg-inherit "
                  />
                  </Link>

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
