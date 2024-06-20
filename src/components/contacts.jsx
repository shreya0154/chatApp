import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Logo from "../assests/logo.svg";
import Logout from "./logout.jsx"

export default function Contacts({contacts, currentUser, changeChat}){
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(()=>{
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser])

    const changeCurrentChat = (index, contact)=>{
        setCurrentSelected(index);
        changeChat(contact);
    }
    
    return <>{
        currentUserImage && currentUserName && (
            <Container>
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h3>heyChat</h3>
                </div>
                <div className="contacts">
                    {
                        contacts.map((contact, index)=>{
                            return(
                                <div className={`contact ${index === currentSelected ? "selected" : ""}`}
                                        key = {index}
                                        onClick={()=> changeCurrentChat(index, contact)}>
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                        alt="avatar"/>
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="currentuser-box">
                    <div className="current-user">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64, ${currentUserImage}`}
                                alt="avatar"/>
                        </div>
                        <div className="username">
                            <div><h2>{currentUserName}  </h2>
                            <h4>(you)</h4></div>
                            
                        </div>
                    </div>
                    <div className="logout"><Logout/></div>
                </div>
                
            </Container>
        )
    }</>
}

// const Contact = styled.div`
// div{
//     color: white;
// }
// `;
const Container = styled.div`
display : grid;
grid-template-rows : 10% 65% 15%;
overflow: hidden;
background-color: #080420;
// background-color: #00000096;
gap : 1rem;
.brand{
    display: flex;
    align-items: center;
    justify-content : center;
    // gap: 2rem;
    img{
        height: 2.5rem;
    }
    h3{
        color: rgb(32, 144, 184);
        // text-transform: uppercase;
    }
}
.contacts{
    display: flex;
    align-items: center;
    overflow: auto;
    flex-direction: column;
    gap: 0.9rem;
    // scrollbar-color: #00000096 #ffffff39;
    // scrollbar-color: #080420 #ffffff39;
    // scrollbar-width: thin;
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.2rem;
            border-radius: 1rem;
        }
    }
    .contact{
        // display: flex;
        // align-items: center
        // flex-direction: column;
        background-color: #ffffff39;
        min-height: 5rem;
        width : 90%;
        cursor:pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        gap : 1rem;
        align-items: center;
        display: flex;
        transition: 0.3s ease-in-out;
        .avatar{
            img{
                height: 3rem;
            }
        }
        // img{
        //     height: 2.5rem;
        // }
        
        .username{
            h3{
            color: white;
            font-family: "Kanit", sans-serif;
            font-weight: 200;
            font-size: 20px;
            
        }}
    }
    .selected{
        background-color: #9186f3;
    }
}

    .currentuser-box{
        display: flex;
        justify-content : space-between;
        align-items: center;
        padding:0.9rem;
        flex-direction: row;

        .current-user{
        display: flex;
        // padding: 1rem;
        align-items: center;
        flex-direction: row;
        gap: 0.9rem;
        .avatar{img{
            height: 3.5rem;
            max-inline-size: 100%;
        }}
        .username{
            h2{
                color: white;
                font-weight: 500;
                // font-size: 20px;
            }
            @media screen and (min-width: 720px) and (max-width: 1080px){
                // grid-template-columns: 35% 65%;
                gap: 0.5rem;
                .username{
                    h2{
                        font-size : 1rem;
                    }
                }
            }

            h4{
                font-weight: 300;
                font-size: 15px;
                color: white;
            }
        }
        .logout{
            padding:0.8rem;
        }
    }

    
}
`;