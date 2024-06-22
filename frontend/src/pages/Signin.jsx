import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import { FailureFlashMessage, SingleFailureFlashMessage } from "./FlashMessage"



export const Signin = ()=>{
    const[username,setEmail]=useState("");
    const [password,Setpassword]=useState("")
    const navigate= useNavigate()
    const [showMessages, setShowMessages] = useState(false);
    const [messages, setMessages] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    return <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center transition-transform duration-500 hover:scale-105">
            <div className="rounded-lg bg-white w-80 text-center h-max px-4 p-2">
            <Header label={"Sign In"}></Header>
            <Subheading label={"Enter your credentials to access your account"}></Subheading>
            
            <InputBox onChange={(e)=>{
                setEmail(e.target.value)
            }} placeholder={"name@example.com"} label={"Email"}></InputBox>
            <InputBox onChange={(e)=>{
                Setpassword(e.target.value)
            }}placeholder={"123456"} label={"Password"}></InputBox>
            <div className="pt-4">
                <Button onClick={async()=>{
                    let response=await axios.post("http://localhost:3000/api/v1/user/signin",{
                        username,
                        password
                    })
                    localStorage.setItem("token",response.data.token)
                    if(response.data.message === "Logged In Successfully"){
                        navigate('/dashboard');
                    }
                    else if(response.data.message==="User does not exist"){
                        setMessage(response.data.message);
                        setShowMessage(true)
                    }
                    else {
                        console.log(response.data.message)
                        // Handle other cases
                        setMessages(response.data.message.map(err => err.message));
                            setShowMessages(true);
                      }
                }} label={"Sign In"}></Button>
            </div>
            
            <BottomWarning label={"Dont have an account ?"} buttonText={"Sign Up"} to={"/signup"} />
            
            </div>
        </div>

        {showMessages && messages.length > 0 && <FailureFlashMessage message={messages} onClose={() => setShowMessages(false)} />}
        {showMessage &&  <SingleFailureFlashMessage message={message} onClose={() => setShowMessage(false)} />}
    </div>
    
}