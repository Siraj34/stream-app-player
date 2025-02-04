import React, { useContext, useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import app from "../componenets/firebase";
import {
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { AlbumContext } from "../context/ContextAl";
import { url } from "../App";
import { useDispatch } from "react-redux";
import { getLogin } from "../reducer/VideoReducer";

function Login() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navegate = useNavigate();

  const submitbutton = (e) => {
    e.preventDefault();
    fetch(`https://stream-data-app.vercel.app/api/user/signin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
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
          //localStorage.setIte('login1', data)
          localStorage.setItem("jwt", data.admin);

          navegate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const register = () => {};
  return (
    <div className=" bg-blue-400  justify-around items-center h-screen md:h-svh  overflow-y-auto">
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
              <h1 className="">Sign-in</h1>
            </div>

            <form
              className="justify-around items-center m-1  flex flex-col"
              onSubmit={submitbutton}
            >
              <h5>E-mail</h5>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="md:w-[400px] p-2  "
              />

              <h5>Password</h5>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="md:w-[400px] p-2 "
              />

              <button
                type="submit"
                className="bg bg-amber-200 h-11 w-24 rounded-full p-2 m-2"
              >
                Sign In
              </button>
            </form>

            <button className="bg bg-amber-200 h-11 w-[300px] rounded-full">
              <Link to={`/signup?redirect=${redirect}`}>
                {" "}
                Create your Video Account
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;