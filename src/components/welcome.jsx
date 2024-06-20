import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Logout from "./logout.jsx"
import Robot from "../assests/robot.gif"
import Chat from "../pages/chat";
export default function Welcome({currentUser}){
    const [currentUserName, setCurrentUserName] = useState(undefined);

    useEffect(()=>{
        if(currentUser){
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser])

    return <Container>
        <img src={Robot} alt="robot" />
        <div className="message">
        <h1>Welcome, <span>{currentUserName} !</span></h1>
        <h3>Please select a chat to start messaging</h3>
        </div>
    </Container>
}

const Container = styled.div`
display : flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 0.5rem;
// width : 50vw;
.message{
    color: white;
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span{
        color: blue;
        color: rgb(43, 95, 250);
    }
    h3{
        font-weight: 200;
        font-size: 20px;
    }
}
img{
    align-items: center;
    height: 15rem;
}


//   grid-template-columns: 25% 75%;
//   @media screen and (min-width: 720px) and (max-width: 1080px){
//     grid-template-columns: 35% 65%;
//   }
}
`;