
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './componenets/Header';



import Login from './screen/SigninScreen';
import SignUp from './screen/SignUpScreen';


import ChannelMoviesScreen from './screen/ChannelMoviesScreen';


import Upload from './screen/CreateFileMoviesScreen';
import Home from './componenets/Home';
import VidoeHome from './componenets/VidoeHome';
import UploadWidget from './componenets/UploadWidget';
import SecureUpload from './componenets/SecureUpload';
import VideoSideBar from './componenets/VideoSideBar';
import Footer from './componenets/Footer';
import HistoryScreen from './screen/HistoryScreen';
import ShowScreen from './screen/ShowScreen';
import SideBar from './componenets/SideBar';
import Search from './componenets/Search';
import Tags from './componenets/Tags';
import TagSearch from './componenets/TagSearch';
import PlayList from './componenets/PlayList';
import PlayVideo from './componenets/PlayVideo';
 








function App() {
 
  
  
  
  return (
    <div>
    <Header/>
    <div className=' relative'>
    
       <SideBar />
   
   </div>
   
    
       
       <Routes>
        
       <Route  path='/' element={<Home/>}/> 
        
       <Route path='/post' element={<UploadWidget/>} />
            <Route path='/secure' element={<SecureUpload/>} />
            <Route path='/history/:id' element={<ShowScreen/>} />
      
       </Routes>
       <Routes>
        <Route  path='/signin' element={<Login/>}/>
       </Routes>
       <Routes>
        <Route  path='/signup' element={<SignUp/>}/>
        <Route path='/video/:id/' element={<VideoSideBar/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/searchs" element={<TagSearch/>} />
        <Route path="/tags" element={<Tags/>} />

       </Routes>
       <Routes>
        <Route  path='/movies' element={<Upload/>}/>
        <Route  path='/play/:id' element={<PlayList/>}/>
        <Route  path='/playList/:id' element={<PlayVideo/>}/>
       </Routes>
       <Routes>
       <Route path='/room/:id/:userId' element={<VidoeHome/>} />
        
        <Route path="/channelMovies/:id" element={< ChannelMoviesScreen/>} />
       </Routes>
       

       
       
       
     <div>
      <Footer/>
     </div>
       
    </div>
  );
}


export default App;
