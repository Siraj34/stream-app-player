import React from 'react'
import HistoryScreen from './HistoryScreen'
import FollowingScreen from './FollowingScreen'

export default function ShowScreen() {
  return (
    <div>
        
        <div><FollowingScreen/></div>
        <div><HistoryScreen/></div>
    </div>
  )
}
