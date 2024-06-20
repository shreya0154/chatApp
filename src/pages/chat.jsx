
// keep the name of function in first capital format otherwise 
// it won't be rendered when imported in app.js
import React, { useState , useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import styled from "styled-components"
import Logo from "../assests/logo.svg"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import {allUsersRoute, host} from '../utils/APIs.js'
import Contacts from '../components/contacts.jsx'
import Welcome from '../components/welcome.jsx'
import ChatContainer from '../components/chatContainer.jsx'
import {io} from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const toastOptions  = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover : true,
    draggable: true,
    theme: "light"
}

  useEffect( ()=>{
    async function setUser(){
      if(!localStorage.getItem("chat-app-user")){
          navigate('/login')
      }
      else{
        console.log("setCurrentUser")
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
    setUser();
}, [])

useEffect(()=>{
  if(currentUser){
    socket.current = io(host);
    socket.current.emit("add-user", currentUser._id);

  }
})


  useEffect(()=>{
    async function fetchContacts(){
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          console.log("data");
          const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          if(data.status === false){
            console.log("from false")
            toast.error(data.msg, toastOptions)
          }
          else{
            setContacts(data.users);
          }
          
        }
        else{
          navigate("/setAvatar")

        }
      }
    }
    fetchContacts();
  }, [currentUser]);

  const changeChat = (chat)=>{
    setCurrentChat(chat);
  }

  return (
  <Container>
    <div className="container">
      <Contacts contacts = {contacts}
       currentUser={currentUser} 
       changeChat = {changeChat}
       />
      {currentChat === undefined ? 
        (<Welcome currentUser={currentUser}/> ) : 
        (<ChatContainer currentChat = {currentChat} currentUser={currentUser} socket ={socket}/>)
      }
      
    </div>
  </Container>


)}

const Container = styled.div`
height : 100vh;
width : 100vw;
display : flex;
flex-direction: column;
justify-content: center;
gap : 1rem;
align-items: center;
background-color: #162534;
// .outside{
// background-color: 
// }
.container{
  height : 85vh;
  width: 85vw;
  background-color: #00000096;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px){
    grid-template-columns: 35% 65%;
  }
}
`;

export default Chat