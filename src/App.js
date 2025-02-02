
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
 








function App() {
 
  
  
  
  return (
    <div>
    <Header/>
    <div className=' relative'>
      
   </div>
   
    
       
       <Routes>
        
       <Route  path='/' element={<Home/>}/> 
        
       <Route path='/post' element={<UploadWidget/>} />
            <Route path='/secure' element={<SecureUpload/>} />
      
       </Routes>
       <Routes>
        <Route  path='/signin' element={<Login/>}/>
       </Routes>
       <Routes>
        <Route  path='/signup' element={<SignUp/>}/>
        <Route path='/video/:id/' element={<VideoSideBar/>} />

       </Routes>
       <Routes>
        <Route  path='/movies' element={<Upload/>}/>
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
