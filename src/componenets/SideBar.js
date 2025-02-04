import React, { useContext,  useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import {  selectUser } from '../reducer/VideoReducer'
import {  useSelector } from 'react-redux'
import {  BiHome, BiMenu,  } from 'react-icons/bi'

import { CgClose, } from 'react-icons/cg'


import { MusicContext } from '../context/ContextAl'
import { ChevronRight, Home, MonitorPlay, Podcast } from 'lucide-react'
export default function SideBar() {
  const {search,SearchBar,tags,bar,SearchTags,setSearchTags} = useContext(MusicContext)
 
  const login = useSelector(selectUser)
  const router = useNavigate()

  const Channel =(value)=>{
    router(`/searchs?q=${value}`)
  }
    
   console.log(bar,'hhhh bar')
  
  return  (
    <div className=' relative z-40'>
         
      {search ? (
          <div className=" 

          bg-zinc-900  text-sm h-[500px]  w-[250px] absolute right-0 left-0 text-white  top-[0px]">
            <span onClick={SearchBar} >{!search ?<BiMenu className='m-3'/>:<CgClose className='m-3'/>}</span>
            <button className='h-10 w-[200px] rounded-xl text-black font-extrabold m-2
            text-center border-b-2
             border-b-black bg-slate-500'>Search All </button>
         
      
      
         <div>
       <div className=" h-full w-[260px]  ">
      
        <div className=" border-b-2 border-b-black">
          <button className="flex m-2 p-2">
            <h2 className="m-2">
              <Home />
            </h2>
            <h2 className="m-2" onClick={() => router(`/`)}>
              <button >Home</button>
            </h2>
          </button>

          <button className="flex m-2 p-2">
            <h2 className="m-2">
              <MonitorPlay />
            </h2>
            <h2 className="m-2" onClick={() => router(`/tags?tag=${SearchTags}`)}>
              <button >Shorts</button>
            </h2>
          </button>

          <button className="flex m-2 p-2">
            <h2 className="m-2">
              <Podcast />
            </h2>
            <h2 className="m-2" onClick={() => router(`/history/${login?._id}`)}>
              <button>
                Subscriptions
              </button>
            </h2>
          </button>
      </div>
    

      <div>
        <button className="flex m-2 p-2">
          <h2 className="m-2" onClick={() => router(`/channelMovies/${login?._id}`)}>
            you
          </h2>
          <h2 className="m-2">
            <ChevronRight />
          </h2>
        </button>
      </div>

      </div>
      
        <div>
        <select onChange={(e)=>Channel((e.target.value))} className="  bg-black text-white m-3 p-3   ">
      {bar?.map((item) => (
        <option className=" border-b-2 border-b-black">
          <button className="flex m-2 p-2">
            <h2 className="m-2">
              <BiHome/>
            </h2>
            <h2 >
              <button >{item}</button>
            </h2>
          </button>
          </option>
      ))}
          </select>
        </div>
        
      </div>
    </div>
 
      ):(   null)}
   
    </div>
  )
 
}