import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { selectPlayList } from '../reducer/VideoReducer';
import { Link } from 'react-router-dom';
import { MusicContext } from '../context/ContextAl';
import { CgPlayList } from 'react-icons/cg';

export default function PlaylListAll() {
   const { Data ,controls} = useContext(MusicContext);
     const list = useSelector(selectPlayList);


     console.log(list ,'playlist 77')
  return (
    <div className='  relative flex '>
          <div>
            <div className='  className="m-2 p-2 text-2xl font-semibold'>PlaylList Playl</div>
           
                <button className=" m-2  " >
                 <Link to={`/play/${list?.post[controls]?._id}`}> <img
                    src={list.post[controls]?.imageUrl}
                    className="md:h-[300px] md:w-[300px] h-[200px] w-[200px] 
                      rounded-lg bg-inherit "
                  />
                  </Link>
                   <div className=' relative'>

                  
                  <div className=" flex  relative right-0 left-0 -top-[50px] ">
                    <div className="flex ml-2">
                      <CgPlayList className='text-4xl' />
                  </div>
                    <div className="flex ml-2 text-2xl">
                      
                        {list?.post?.length}
                      
                    </div>
                  </div>
                   </div>
                </button>
            
            </div>
    </div>
  )
}
