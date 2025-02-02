import React from "react";

import { MessageCircle, Search } from "lucide-react";
import Video from "./Video";
import SideVideo from "./SideVideo";

export default function VidoeHome() {
  return (
    <div className=" md:flex justify-around bg-green-900 max-h-full">
       
       <div
        className="
           flex  justify-center items-center 
            bg-purple-700  md:min-h-full  overflow-y-auto"
      >
        <Video/>

       
      </div>
    
    
      <div
         className="
        flex  
            bg-purple-700  md:min-h-full  overflow-y-auto"
      >
         <SideVideo/>
      </div>
     

    </div>
  );
}
