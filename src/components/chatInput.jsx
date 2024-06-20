import React, {useState} from 'react'
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
// import EmojiPicker from 'emoji-picker-react';
// import { Theme } from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

export default function ChatInput({handleSendMsg}) {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    let emojiNum = 0;
    const handleEmojiPickerHideShow=()=>{
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick=(event, emoji)=>{
        console.log("message" , message)
        let msg = message;
        console.log("to emoji")
        console.log(event);
        console.log("from emoji")
        msg += event.emoji;
        console.log("msg" , msg);
        emojiNum++;
        setMessage(msg);
    }


    const handleInputChange = (e)=>{
        setMessage(e.target.value);
        // handleSendMsg(message);
    }

    const sendChat = (event)=>{
        event.preventDefault();
        if(message.length === 2*emojiNum){
            console.log(message.length);
            console.log("sending msg")
            handleSendMsg(message);
            setMessage("");
            // event.target.value = '';
        }
        else if(message.length>0){
            console.log(message.length);
            console.log("sending msg")
            handleSendMsg(message);
            setMessage("");
            // event.target.value = '';
        }
        // else 
    }

  return (
    <Container>
        {/* <input type="text" name="chatinput" id="chatinput" placeholder='Write message'/> */}

        <div className="emoji-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
            </div>
        </div>
        <form className="input-container" id="inputMsg" onSubmit={(e)=>sendChat(e) }>
            <input type="text" 
                placeholder='type your message here'
                value={message}
                // onChange={(e)=>handleInputChange(e)}
                onChange={(e)=>setMessage(e.target.value)}
            />
            <button className='submit' >
                <IoMdSend />
            </button>
        </form>
        
    </Container>
  )
}

const Container = styled.div`
// display: grid;
// grid-template-columns: 5% 95%;
// align-items: center;
// // background-color: #9a86f3;
// background-color: #080420;
// // padding: 0 2rem;
// padding: 0.3rem;
// // padding-bottom : 0.1rem;
// padding-bottom : 0.3rem;


// .emoji-container{
//     display: flex;
//     align-items: center;
//     color:white;
//     gap: 2rem;
//     position: relative;
//     .emoji{
//         position: relative;
//         svg{
//             font-size: 1.5rem;
//             color: #ffff00c8;
//             cursor: pointer;
//         }
//         .emoji-picker-react{
//             position: absolute;
//             bottom: 100%;     /* This will position the top edge of the picker right at the bottom edge of the button */
//             transform: translateY(-10px);     /* This will move the picker up by its own height, effectively placing it above the button */
//             z-index: 1000;
//             background-color: #080420;
//             // bottom: 100%; /* Adjust this value as needed */
//             // left: 0;
//             // z-index: 1000;
//         }
        
//     }
//     // .emoji-picker-wrapper {
//     //         position: absolute;
//     //         bottom: 100%; /* Position the picker above the button */
//     //         left: 0;
//     //         // transform: translateY(-10px); /* Optional: Adjust this value to fine-tune the position */
//     //         // z-index: 1000; /* Ensure the picker is above other elements */
//     //  }
// }
// .input-container{
//     width: 100%;
//     border-radius : 1rem;
//     display: flex;
//     align-content: center;
//     gap: 2rem;
//     background-color: #ffffff34;
//     input{
//         width: 90%;
//         height: 70%;
//         background-color: transparent;
//         color: white;
//         border: none;
//         padding-left : 1rem;
//         padding-top: 0.3rem;
//         font-size : 1.2rem;
//         &::selection{
//             background-color: #9a86f3;
//         }
//         &:focus{
//             outline: none;
//         }
//     }
//     .submit{
//         padding: 0.3rem 2rem;
//         border-radius: 1rem;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         background-color: #9a86f3;
//         border: none;
//         cursor: pointer;
//         svg{
//             font-size: 2rem;
//             color: white;
//         }
//     }
// }


// 






display: flex;
    align-items: center;
    background-color: #080420;
    padding: 0.5rem;
    @media screen and (min-width : 720px) and (max-width: 1080px){
        padding: 0 1rem;
        gap: 1rem;
    }
    .emoji-container {
        position: relative;

        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .emoji-picker-react {
                position: relative;
                bottom: 100%; /* Position the picker above the button */
                transform: translateY(-10px); /* Optional: Adjust this value to fine-tune the position */
                z-index: 1000;
                background-color: #080420;
            }
        }
    }

    .input-container {
        display: flex;
        width: 100%;
        border-radius: 1rem;
        background-color: #ffffff34;
        margin-left: 1rem;

        input {
            flex: 1;
            background-color: transparent;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            font-size: 1.2rem;
            &::selection {
                background-color: #9a86f3;
            }
            &:focus {
                outline: none;
            }
        }

        .submit {
            padding: 0.3rem 2rem;
            border-radius: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            @media screen and (min-width : 720px) and (max-width: 1080px){
                padding: 0.3rem 1rem;
                svg{
                    font-size: 1rem;
                }
            }
            cursor: pointer;
            svg {
                font-size: 2rem;
                color: white;
            }
        }
    }
`;