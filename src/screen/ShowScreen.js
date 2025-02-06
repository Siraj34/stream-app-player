import React from 'react'
import HistoryScreen from './HistoryScreen'
import FollowingScreen from './FollowingScreen'
import PlaylListAll from '../componenets/PlaylListAll'

export default function ShowScreen() {
  return (
    <div className=' h-full overflow-y-auto bg-green-600'>
        
        <div className='m-2'><FollowingScreen/></div>
        <div className='m-2'><HistoryScreen/></div>
        <div className=''><PlaylListAll/></div>
    </div>
  )
}
