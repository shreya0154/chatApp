import React, { useState , useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import styled from "styled-components"
import loader from '../assests/loader.gif'
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { Buffer } from 'buffer'
import {setAvatarRoute} from '../utils/APIs.js'

function SetAvatar() {
    console.log("started")
    const api = "https://api.multiavatar.com/45678945"
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const toastOptions  = {
        position: "top-right",
        autoClose: 4000,
        pauseOnHover : true,
        draggable: true,
        theme: "light"
    }

    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate('/login')
        }
    }, [])


    const setProfilePic = async ()=>{
        if(selectedAvatar === undefined){
            toast.error("Please select an avatar", toastOptions)
        }
        else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image : avatars[selectedAvatar],
            })
            if(data.isSet){
                console.log("all set")
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate('/')
            }
            else{
                toast.error("Error setting avatar. Please try again", toastOptions)
            }
        }
    };
    useEffect(()=>{
        const fetchData=async()=>{
        try{const data = [];
        for(let i = 0 ; i<4; i++){
            // const image = await axios.get(
            //     `${api}/${Math.round(Math.random() * 1000)}`
            // )
            // const buffer = new Buffer.from(image.data);
            // data.push(buffer.toString("base64"))


            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`, {
                responseType: 'arraybuffer'
              });
              data.push(Buffer.from(image.data, 'binary').toString('base64'));
        }
        setAvatars(data)
        setLoading(false);
    }catch(err){
        console.error('error fetching avatars', err)
    }
    }
    fetchData() ;
    }, [])

    
  return (
    <>
    {
        loading ? <Container>
            <img src={loader} alt="loader" className='loader'/>
        </Container>:(
        <Container>
        <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">
            {
                avatars.map((avatar, index)=>{
                    return (
                        <div 
                        key = {index}
                        className={`avatar ${
                            selectedAvatar === index? "selected":""}`}>
                                <img src={`data:image/svg+xml;base64, ${avatar}`}
                                alt="avatar"
                                onClick={()=>setSelectedAvatar(index)} 
                                />
                            </div>
                    );
                })
            }
        </div>
        <button className='submitBtn' onClick={setProfilePic}>Set as Profile Picture</button>
        </Container>
    )}
     <ToastContainer/>
    </>
)}


const Container = styled.div`
display : flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: #162534;
gap : 4rem;
height : 100vh;
width : 100wh;
.loader{
    max-inline-size: 100%;
}
.title-container{
    h1{
        color: white;
    }
}
.avatars{
    display: flex;
    gap : 2rem;
    .avatar{
        border:0.4rem solid transparent;
        padding : 0.4rem;
        border-radius: 3rem;
        display: flex;
        justify-content: center;
        cursor:pointer;
        align-items: center;
        transition: 0.3s ease-in-out;
        img{
            height : 6rem;
        }  
    }
    .selected{
        border : 0.4rem solid #4e0eff;
    } 
    
}
.submitBtn{
    background-color: #997af0;
    padding: 1.10rem;
    border:none;
    border-radius: 1.15rem;
    cursor: pointer;
    font-weight: 900;
    font-size: 15px;
    font-family: sans-serif;
    color:white;
    transition : 0.3s ease-in-out;
    &:hover{
        background-color: #4e0eff;
    }
}
`;

export default SetAvatar