import React from 'react'
import HistoryScreen from './HistoryScreen'
import FollowingScreen from './FollowingScreen'

export default function ShowScreen() {
  return (
    <div className=' h-screen overflow-y-auto bg-green-600'>
        
        <div><FollowingScreen/></div>
        <div><HistoryScreen/></div>
    </div>
  )
}
