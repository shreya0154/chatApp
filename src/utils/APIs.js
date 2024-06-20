// const registerRoute = "http://127.0.0.1:3000/chatapp/api/v1/auth/register"
// module.exports = {registerRoute}


// const host = "http://localhost:5000";
const host = "https://heychat-h4xe.onrender.com";
const registerRoute = `${host}/chatapp/api/v1/auth/register`
const loginRoute = `${host}/chatapp/api/v1/auth/login`
const passwordRoute = `${host}/chatapp/api/v1/auth/forgotpassword`
const setAvatarRoute = `${host}/chatapp/api/v1/auth/setavatar`
const allUsersRoute = `${host}/chatapp/api/v1/auth/getallusers`
const getChatUserRoute = `${host}/chatapp/api/v1/auth/getchatuser`
const sendMessageRoute = `${host}/chatapp/api/v1/auth/addmsg`
const getAllMessageRoute = `${host}/chatapp/api/v1/auth/getmsg`
module.exports = {host, registerRoute, loginRoute, passwordRoute, setAvatarRoute, 
                    allUsersRoute, getChatUserRoute, sendMessageRoute, getAllMessageRoute};