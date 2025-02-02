import React, { useContext, useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
  ref,
} from "firebase/storage";

import axios from "axios";
import app from "../componenets/firebase";
import {  MusicContext } from "../context/ContextAl";
import { useDispatch } from "react-redux";
import { getLogin } from "../reducer/VideoReducer";

function SignUp() {
  const { sign, setsign } = useContext(MusicContext);
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [pic, setPic] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setdata] = useState({});
  const dispatch = useDispatch();

  const navegate = useNavigate();

  useEffect(() => {
    pic && upploadfile(pic, "imageUrl");
  }, [pic]);

  const upploadfile = (file, fileType) => {
    const storage = getStorage(app);
    const folder = fileType === "imageUrl" ? "images" : "videos";
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setdata((prev) => {
            return { ...prev, [fileType]: downloadURL };
          });
        });
      }
    );
  };

  const submitbutton = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/user/signup/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        ...data,
        name,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          alert("Successfully Posted");
          dispatch(getLogin(data));
          navegate("/signin");
          setsign(data);
        }
      })
      .catch((err) => console.log(err));
  };

  console.log("h", data);
  const register = () => {};
  return (
    <div className=" bg-blue-400 overflow-y-auto  justify-around items-center h-screen md:h-svh ">
      <div className="bg  ">
        <div className=" flex flex-col  ">
          <div className=" justify-around items-center m-3 p-4 flex flex-col  ">
            <img
              width={200}
              height={300}
              className=" rounded-full"
              src="./images/soon2.png"
              alt=""
            />
          </div>

          <div className="justify-around items-center m-1  flex flex-col ">
            <div className="">
              {" "}
              <h1 className="">Sign-Up</h1>
            </div>

            <form
              className="justify-around items-center m-1  flex flex-col"
              onSubmit={submitbutton}
            >
              <h5>Name</h5>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="md:w-[400px] p-2 h-10 "
              />
              <h5>E-mail</h5>
              <input
                required
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="md:w-[400px] p-2 h-10"
              />

              <h5>Password</h5>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="md:w-[400px] p-2 h-10"
              />
              <h5>confirm Password</h5>
              <input
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="md:w-[400px] p-2 h-10"
              />

              <button>
                <input
                  required
                  className="bg  bg-blue-800 rounded-full m-5 p-5 h-16 w-60 text-center flex flex-col gap-4"
                  type="file"
                  placeholder="image"
                  accept="image/*"
                  id="image"
                  hidden
                  onChange={(e) => setPic(e.target.files[0])}
                />
              </button>

              <button
                type="submit"
                className="bg bg-amber-200 h-11 w-24 rounded-full p-2 m-2"
              >
                Sign Up
              </button>
            </form>

            <button className="bg bg-amber-200 h-14 md:w-[400px] rounded-full p-2 mb-2">
              <Link to={`/signin?redirect=${redirect}`}>
                {" "}
                Create your Video Account Already have an account{""}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
