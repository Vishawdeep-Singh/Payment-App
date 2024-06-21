import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"



export const Signin = ()=>{
    const[username,setEmail]=useState("");
    const [password,Setpassword]=useState("")
    const navigate= useNavigate()
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
                    if(response){
                        navigate('/dashboard');
                    }
                    else {
                        // Handle other cases
                        console.log('User  login failed:', response.data.msg);
                      }
                }} label={"Sign In"}></Button>
            </div>
            
            <BottomWarning label={"Dont have an account ?"} buttonText={"Sign Up"} to={"/signup"} />
            </div>
        </div>

    </div>
}