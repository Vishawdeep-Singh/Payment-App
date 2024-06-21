import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"



export const Signup = ()=>{
    const [username,Setusername]=useState("")
    const [firstName,Setfirstname]=useState("")
    const [lastName,Setlastname]=useState("")
    const [password,Setpassword]=useState("")
    const navigate = useNavigate(); // Hook to get the navigate function

    return <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center transition-transform duration-500 hover:scale-105">
            <div className="rounded-lg bg-white w-80 text-center h-max px-4 p-2">
            <Header label={"SignUp"}></Header>
            <Subheading label={"Enter your information to create your account"}></Subheading>
            <InputBox onChange={(e)=>{
                Setfirstname(e.target.value)
            }} placeholder={"John"} label={"First Name"}></InputBox>
            <InputBox onChange={(e)=>{
                Setlastname(e.target.value)
            }} placeholder={"Doe"} label={"Last Name"}></InputBox>
            <InputBox onChange={(e)=>{
                Setusername(e.target.value)
            }} placeholder={"name@example.com"} label={"Email"}></InputBox>
            <InputBox onChange={(e)=>{
                Setpassword(e.target.value)
            }} placeholder={"123456"} label={"Password"}></InputBox>
            <div className="pt-4">
                <Button onClick={async ()=>{
                  let response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                        username,
                        firstName,
                        lastName,
                        password
                    })
                    localStorage.setItem("token",response.data.token)
                    if(response.data.msg==="User Created Successfully"){
                        navigate('/dashboard');
                    }
                    else {
                        // Handle other cases
                        console.log('User creation failed:', response.data.msg);
                      }
                }} label={"Sign up"}></Button>
            </div>
            
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>

    </div>
}