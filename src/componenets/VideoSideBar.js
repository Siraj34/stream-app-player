import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios';
import { MusicContext } from '../context/ContextAl';

function VideoSideBar() {
    const {id} = useParams()
   
 const { play, setplay, controls, setcontrols, Data } = useContext(MusicContext);
 const [vdata, setvdata] = useState([]);

    useEffect(() => {
        const getfetch = async () => {
          const { data } = await axios.get(
            `http://localhost:4000/api/movies/room/${id}`
          );
          setvdata(data);
        };
        getfetch();
      }, [id]);
   
  return (
    <div>
        
     <video  src={vdata?.videoUrl} controls autoPlay/>

   
    </div>
  )
}

export default VideoSideBar