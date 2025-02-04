import React, { useContext, useEffect,  useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'


import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  getStorage,
 
} from 'firebase/storage'

import app from '../componenets/firebase'
import { AlbumContext } from '../context/ContextAl'
import { selectUser } from '../reducer/VideoReducer'
import { useSelector } from 'react-redux'


function Upload() {
  const login = useSelector(selectUser)
  const [img, setImg] = useState(null)
  const [video2, setVideo2] = useState(null)
  const [name, setName] = useState('')
  const [views, setViews] = useState('')
  const [slug, setSlug] = useState('')
  
 const [star, setStar] = useState('')
  const [title, setTitle] = useState('')
  const [get, setget] = useState([])
  const [data, setdata] = useState({})

  const navigate = useNavigate()
  
  useEffect(() => {
    video2 && upploadfile(video2, 'videoUrl')
  }, [video2])

  useEffect(() => {
    img && upploadfile(img, 'imageUrl')
  }, [img])

  const upploadfile = (file, fileType) => {
    const storage = getStorage(app)
    const folder = fileType === 'imageUrl' ? 'images' : 'videos'
    const filename = new Date().getTime() + file.name
    const storageRef = ref(storage, folder + filename)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break
          case 'storage/canceled':
            break

          case 'storage/unknown':
            break
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          setdata((prev) => {
            return { ...prev, [fileType]: downloadURL }
          })
        })
      }
    )
  }

  const submitbutton = (e) => {
    e.preventDefault()
    fetch('https://stream-data-app.vercel.app/api/movies/post', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        ...data,
        name,
        title,
     
        slug,
        userName: login?.name,
        user: login?.email,
        image:login?.imageUrl
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          alert('Successfully Posted')
         navigate('/')
        }
      })
      .catch((err) => console.log(err))
  }

  
  
  return (
    <div  className=' bg-red-300 flex flex-col '>
    <div  className="bg m-3  flex justify-center overflow-y-auto md:max-w-full  overflow-x-auto md:max-w-screen ">
      <h1></h1>
      <form
        onSubmit={submitbutton}
       className="md:flex md:flex-col  md:m-2 md:p-2  justify-center  text-black font-bold md:h-screen md:max-h-full md:max-w-full"
      >
        <button className="m-2 h-16 text-wrap font-bold text-2xl w-80 bg-red-500 text-center hover:bg-white">
          Create Post File Movies{' '}
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
              id='image'
              hidden
              onChange={(e) => setImg(e.target.files[0])}
            />
          </button>
          <h1>Video</h1>
          <input
          required
            className="bg bg-blue-800 rounded-full m-5 p-5 h-16 w-60 text-center flex"
            type="file"
            placeholder="viedo"
            multiple
            accept="video/*"
            onChange={(e) => setVideo2(e.target.files[0])}
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
             

          <input
          required
          className="m-2 h-10 text-black w-80 bg-red-400 text-center hover:bg-white"
          type="text"
          placeholder="Example: crime/action/drama..."
          onChange={(e) => setSlug(e.target.value)}
        />
        
       

         
     

        <button className="m-2 h-10 w-60 bg-red-400 text-center hover:bg-white">
          submit
        </button>
      </form>
    </div>
    </div>
  )
}

//  prev) => [...prev, url]
export default Upload