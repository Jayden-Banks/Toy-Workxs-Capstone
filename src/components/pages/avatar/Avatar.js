import './Avatar.css'
import { useSelector } from 'react-redux'
import React from 'react'

function Avatar() {
  const user = useSelector((state) => state.user.user);
  return (
    <div>
    {user.avatar ? <div id="div-pokemon" style={{backgroundImage: `url(${user.avatar})`}}></div> : <div id="div-placeholder"></div> }
      
    </div>
  )
}

export default Avatar
