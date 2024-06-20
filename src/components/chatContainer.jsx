import React, { useEffect, useState , useRef} from 'react'
import Logout from "./logout.jsx"
import ChatInput from './chatInput.jsx';
import { Link , useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import Messages from './messages.jsx';
import { getAllMessageRoute, sendMessageRoute } from '../utils/APIs.js';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {v4 as uuidv4} from 'uuid';

export default function ChatContainer({currentChat, currentUser, socket}) {
    const [currentChatUsername, setCurrentChatUsername] = useState(undefined);
    const [currentChatAvatar, setCurrentChatAvatar] = useState(undefined);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    const toastOptions  = {
        position: "top-right",
        autoClose: 4000,
        pauseOnHover : true,
        draggable: true,
        theme: "light"
    }

    const handleSendMsg = async(message)=>{
        console.log(message)
        try{
            const { data } = await axios.post(sendMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: message
            });
            if(data.status === false){
                toast.error(data.msg, toastOptions)
            }
            else{
                console.log(data.msg);
            }
            socket.current.emit("send-msg", {
                to: currentChat._id,
                from: currentUser._id,
                message: message,
            })
            const msgs = [...messages];
            msgs.push({fromSelf: true, message: message})
            setMessages(msgs);
            
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-receive", (message)=>{
                setArrivalMessage({fromSelf: false, message: message});
            })
        }
    }, [])

    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev, arrivalMessage]);
    }, [arrivalMessage])


    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    }, [messages])

    useEffect(()=>{
        if(currentChat !== undefined){
            setCurrentChatUsername(currentChat.username)
            setCurrentChatAvatar(currentChat.avatarImage)
        }
    })

    useEffect(()=>{
        async function changeChatBox(){
            if(currentChat){
                const response = await axios.post(getAllMessageRoute,{
                    from : currentUser._id,
                    to: currentChat._id
                })
                setMessages(response.data)
            }
        }
        changeChatBox();
    }, [currentChat])

    // useEffect(()=>{
    //     async function getChatUser(){
    //         if(currentChatUsername !== undefined){
    //             const { data } = await axios.get(`${getChatUserRoute}/${currentChat._id}`)
    //         //     if(data.status === false){
    //         //         console.log("from false")
    //         //         toast.error(data.msg, toastOptions)
    //         //     }
    //         //     else{
    //         //         setContacts(data.users);
    //         //     }
    //         // }
    //     }
    // }, [currentChatUsername])
    
  return (
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                {currentChatAvatar !== undefined ? <img src={`data:image/svg+xml;base64, ${currentChatAvatar}`}
                    alt="avatar"
                /> : "" }
                
                </div>
                <div className="username">
                    <h3>{currentChatUsername}</h3>
                </div>
            </div>
            <Logout/>
        </div>
        <div className="chat-messages">
            {
                messages.map((msg)=>{
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${msg.fromSelf ?"sent":"received"}`}>
                                <div className="content">
                                    <p>{msg.message}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <ChatInput handleSendMsg = {handleSendMsg}/>

    </Container>
  )
}


const Container = styled.div`
padding: 1rem;
display: grid;
grid-template-rows: 10% 78% 12%;
gap: 0.1rem;
overflow: hidden;
@media screen and (min-width: 720px) and (max-width: 1080px){
    grid-template-rows: 15% 70% 15%;
}
.chat-header{
    display: flex;
    justify-content : space-between;
    align-items: center;
    padding : 0.2rem;
    .user-details{
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar{
            img{
                height: 3rem;
            }
        }
        .username{
            h3{
                color: white;
            }
        }
    }
}

.chat-messages{
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.2rem;
            border-radius: 1rem;
        }
    }
    .message{
        display: flex;
        align-items: center;
        .content{
            max-width: 40%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size: 1.1rem;
            border-radius: 1rem;
            color: #d1d1d1;
        }
    }
    .sent{
        justify-content: flex-end;
        .content{
            background-color: #4f04ff21;
        }
    }
    .received{
        justify-content: flex-start;
        .content{
            background-color: #9900ff20;
        }
    }
}

`;