import React, { useState , useEffect} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import styled from "styled-components"
import Logo from "../assests/logo.svg"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import {registerRoute} from '../utils/APIs.js'

function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username:"",
        email: "", 
        password: "",
        confirmPassword: "" 
    })


    

    // useEffect(()=>{
    //     if(localStorage.getItem("chat-app-user")){
    //         navigate('/')
    //     }
    // }, [])



    const handleSubmit = async (event)=>{
        event.preventDefault();
        console.log("submitted")
        if(handleValidation()){
            const {password, username, email} = values;
            // call api 
            console.log("validated")

            try{
                const { data } = await axios.post(registerRoute, {
                    username,
                    email,
                    password
                });
                console.log("response from server")
                // console.log({registerResponse});
                if(data.status === false){
                    console.log("from false")
                    toast.error(data.message, toastOptions)
                }
                if(data.status === true){
                    console.log("from true")
                    localStorage.setItem("chat-app-user", JSON.stringify(data.user))
                    navigate("/login")
                }
            }
            catch(err){
                console.log(err);
            }
            
            // console.log(registerResponse)
        }
    }
    const toastOptions  = {
        position: "top-right",
        autoClose: 4000,
        pauseOnHover : true,
        draggable: true,
        theme: "light"
    }

    const handleValidation = ()=>{
        const {password, confirmPassword, email, username} = values;
        if(password.length < 8){
            toast.error("password must be atleast 8 characters long.", toastOptions);
            console.log("false");
            return false;
        }
        else if(username.length < 3){
            toast.error("username must be atleast 3 characters long.", toastOptions);
            console.log("false");
            return false;
        }
        else if(password !== confirmPassword){
            toast.error("password and confirm password must be same.", toastOptions)
            console.log("false");
            return false;
        } 
        else if(email === ""){
            toast.error("email is required.", toastOptions);
            console.log("false");
            return false;
        }
        console.log("true");

        return true;
    }


    const handleChange = (event)=>{
        setValues({...values, [event.target.name]: event.target.value});
    }
        
    
  return (
    <>
    <FormContainer>
        <div className='formBox'>
        <form onSubmit={(event)=>handleSubmit(event)}>
        <div className='brand'>
            <img src={Logo} alt="Logo" />
            <h2>heyChat</h2>
        </div>
        
        <input type="text" 
            placeholder='Username' 
            name='username' 
            onChange={(e)=>handleChange(e)}
        />
        <input type="email" 
            placeholder='email' 
            name='email' 
            onChange={(e)=>handleChange(e)}
        />
        {/* <input type="tel" 
            placeholder='Contact no.' 
            name='contact' 
            onChange={(e)=>handleChange(e)}
        /> */}
        <input type="password" 
            placeholder='Password' 
            name='password' 
            onChange={(e)=>handleChange(e)}
        />
        <input type="password" 
            placeholder='Confirm Password' 
            name='confirmPassword' 
            onChange={(e)=>handleChange(e)}
        />
        <button type='Submit'>Create account</button>
        <span>Already have an account ? <Link to="/login">Login</Link></span>
        </form>
        </div>
    </FormContainer>
    <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
   height : 100vh;
   width:100vw;
   display : flex;
   flex-direction:column;
   justify-content :center;
   gap: 1rem;
   align-items:center;
   background-color: #162534;
   .brand{
    display: flex;
    align-items: center;
    flex-direction:column;
    justify-content :center;
    // gap: 0rem;
    img{
        height:5rem;
    }
    h2{
        color : rgb(32, 144, 184);
    }
   }
   

.formBox{
        padding: 2.5rem;
        background-color: #00000096;
        height: 90%;
        width: 30%;
        border-radius: 1rem;
        
}

form{
    display: flex;
    flex-direction:column;
    background-color:transparent;
    gap: 1.20rem;
    border-radius:2;
    padding:2rem, 0, 1rem, 0;
    
}


form input, select, button{
    padding: 10px;
    width: 100%;
    border:none;
    border-radius: 0.5rem;
    outline: none;

}

button{
    background-color: #997af0;
    border-radius: 1.15rem;
    cursor: pointer;
    font-weight: 900;
    font-size: 15px;
    font-family: sans-serif;
    color:white;
}

span{
    margin-left:40px;
    color:rgb(91, 87, 87);
}

input{
    font-size: 1rem;
}

`;
export default Register