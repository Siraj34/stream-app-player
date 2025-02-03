import axios from "axios";
import { Repeat, Repeat1, Shuffle } from "lucide-react";
import { useDispatch } from "react-redux";
import { getVideo } from "../reducer/VideoReducer";
import toast from "react-hot-toast";

 
const {
  createContext,
  useRef,
  useState,
  useEffect,
 
} = require("react");

export const MusicContext = createContext();

function MusicContextProvider({ children }) {
const [Data, setData] = useState([])
const audio = useRef();
  const [play, setplay] = useState(0);
  const [controls, setcontrols] = useState(play + 1);
  const [playing, setPlaying] = useState(false);
  const [duration, setduration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setvolume] = useState(0);
  const [inputVolume, setinputVolume] = useState(false);
  const [repeat, setrepeat] = useState('repeat')
  const [list, setlist] = useState(false)
  const [messages, setMessages] = useState(false)
  const [header, setheader] = useState(false)
  const [search, setsearch] = useState(false)
  const dispatch = useDispatch()
  const [get, setGet] = useState([]);
  
 // const FILE_URL = `http://localhost:3000/room/${Data[play]._id}`
  

 

  
 useEffect(() => {
  const getfetch = async () => {
  const  {data}  = await axios.get("http://localhost:4000/api/movies/get")

  
  localStorage.setItem('video', JSON.stringify(data))
  setData(data)
  dispatch(getVideo(data))
}
    getfetch()
  }, [])
   const ListNew =()=>{
    setlist(!list)
   }

   
   const ListSearch =()=>{
    setsearch(!search)
   }

   const LisHeader =()=>{
    setheader(!header)
   }

   const ListMessages =()=>{
    setMessages(!messages)
   }

  const songOne =() => {
   
      audio.current.play();
      setPlaying(true);
    
  };

  const songTwo =() => {
  
      audio.current.pause();
      setPlaying(false);
  
  ;}
  
  

 const handSkip =(value=true)=>{
  if (value) {
    setplay(()=>{
      let skip = play;
      skip++;
      if (skip > Data.length - 1) {
        skip = 0;
      }
      return skip;
    })
  }
  else{
    setplay(() => {
      let skip = play;
      skip--;
      if (skip < 0) {
        skip = Data.length - 1;
      }
      return skip;
    });
  }
  
   
 }

  useEffect(() => {
  setcontrols(()=>{
    if (play +1 > Data.length-1) {
      return 0;
    }else{
      return play+1;
    }
  })
  }, [play]);

  const handload = (e) => {
    const src = e.nativeEvent.srcElement.src;
    const audioLload = new Audio(src);
    audioLload.onloadedmetadata = function () {
      if (audioLload.readyState > 0) {
        setduration(audioLload.duration);
      }
    };
    if (playing) {
      audio.current.play();
    }
  };

  const timeHndel = () => {
    const currentT = audio.current?.currentTime;
    setCurrentTime(currentT);
  };


  const addVolume = () => {
    setinputVolume(!inputVolume);
  };

  
    function handVolume() {
       audio.current.volume = volume/100
    }
 

  

 

  const handleTime = (e) => {
    const time = Number(e);
    audio.current.currentTime = time;
    setCurrentTime(time);
  };


  const endAudio =()=>{
    switch (repeat) {
      case 'repeat_one':
        return audio.current.play()

        case 'shuffle':
       
        return (handSkip(true))
    
      default:
        return handShuffle(1)
    }
  }

  
  const repeatAll =()=>{
    setrepeat( value => {
      switch (value) {
        case 'repeat':
          
        return 'repeat_one'
        case 'repeat_one':
         return 'shuffle'
        default:
          return 'repeat'
      }
    })
  }
  
  const handShuffle = ()=>{
    const num = randomNumber()
    setplay(num)
  }

  const randomNumber=()=>{
    const number = Math.floor(Math.random() * (Data.length - 1))
    if (number === play) {
    
      return number;
     
    }
     return randomNumber()
  }

  
 

  const vaules = {
    get,
    audio,
    playing,
    setPlaying,
    handSkip,
    messages,setMessages,ListMessages,
    Data,
    play,
    controls,
    setcontrols,
    setplay,
    handload,
    timeHndel,
    currentTime,
    duration,
    volume,
    setvolume,
    handVolume,
    inputVolume,addVolume,
    setinputVolume,
    handleTime,
    songOne,songTwo,
    endAudio ,repeatAll,repeat,
    ListNew,list,setlist,
   LisHeader,header,setheader,
   ListSearch,search,setsearch
  };
  return (
    <MusicContext.Provider value={vaules}>{children}</MusicContext.Provider>
  );
}

export default MusicContextProvider;
