import React,{useState,useEffect,useRef} from 'react'
import ChatContainer from '../components/chat/ChatContainer'

import {io} from "socket.io-client"

import styles from "../scss/pages/chat.module.scss"

function Chat() {
  const [currentUserId,setCurrentUserId]=useState(undefined)
  const socket = useRef();
  

  useEffect(() => {
    setCurrentUserId(localStorage.getItem("_id"))
  },[])

  useEffect(() => {
    if (currentUserId) {
      socket.current = io("https://chat-box-nodejs-demo.herokuapp.com")
      socket.current.emit("client-add-user-server",currentUserId)
    }
  },[currentUserId])

  return (
    <div className={styles.container}><ChatContainer socket={socket} /></div>
  )
}

export default Chat