import axios from "axios";
import React, { useState } from "react";
import { selectUser } from "../reducer/VideoReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Audio } from 'react-loader-spinner'

const UploadWidget = () => {
  const login = useSelector(selectUser);
  const [imae, setImage] = useState([]);
  const [vido, setVideo] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const uploadFile = async (Blob) => {
    const data = new FormData();
    data.append("file", Blob === "image" ? imae : vido);
    data.append(
      "upload_preset",
      Blob === "image" ? "image_preset" : "video_preset"
    );

    try {
      //let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      let upload = Blob === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/chat-ap23/${upload}/upload/`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const submitbutton = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const imageUrl = await uploadFile("image");
      const videoUrl = await uploadFile("video");
      await axios.post("https://room-main.vercel.app/api/movies/post", {
        imageUrl,
        videoUrl,
        name,
        title,
        userName: login?.name,
        user: login?.email,
        userImage:login?.imageUrl
      });
      setImage(imageUrl);
      setVideo(videoUrl);
      console.log(" file upload success");
      navigate("/");
      setloading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" bg-red-300 flex flex-col ">
      <div className="bg m-3  flex justify-center overflow-y-auto md:max-w-full  overflow-x-auto md:max-w-screen ">
        <form
          onSubmit={submitbutton}
          className="md:flex md:flex-col  md:m-2 md:p-2  justify-center  text-black font-bold md:h-screen md:max-h-full md:max-w-full"
        >
          <button className="m-2 h-16 text-wrap font-bold text-2xl w-80 bg-red-500 text-center hover:bg-white">
            Create Post File{" "}
          </button>
          <div className="m-4 p-4 text-red-400 fill-emerald-500 h-[300px] w-80 text-center bg-stone-700 hover:bg-white">
            <h1>Image</h1>
            <button>
              <input
                required
                className="bg  bg-blue-800 rounded-full m-5 p-5 h-16 w-60 text-center flex flex-col gap-4"
                type="file"
                placeholder="image"
                accept="image/*"
                id="image"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </button>
            <h1>Video</h1>
            <input
              required
              className="bg bg-blue-800 rounded-full m-5 p-5 h-16 w-60 text-center flex"
              type="file"
              placeholder="viedo"
              accept="video/*"
              id="video"
              hidden
              onChange={(e) => setVideo(e.target.files[0])}
            />

          </div>
          
          <input
              required
              className="m-2 h-10 text-black w-80 bg-red-400 text-center hover:bg-white"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              className="m-2 h-10 text-black w-80 bg-red-400 text-center hover:bg-white"
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          <button className="m-2 h-10 w-60 bg-red-400 text-center hover:bg-white">
            submit
          </button>
        </form>
          {loading && (
                  <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="three-dots-loading"
                    wrapperStyle
                    wrapperClass
                  />
                )}
      </div>
    </div>
  );
};

export default UploadWidget;
