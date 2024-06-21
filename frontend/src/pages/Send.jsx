import axios from "axios"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import { FlashMessage } from "./FlashMessage"


export const Send=()=>{
    const location = useLocation();
    const [amount,setAmount]=useState(0);
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const { state } = location;
    console.log(state)

    if (!state) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        );
      }
   
    return <div className="bg-slate-700 h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center transition-transform duration-500 hover:scale-105">
            <div className="rounded-lg bg-white w-80 text-center h-max px-4 p-2">
            <Header label={"Send Money"}></Header>

           <div className="flex items-center pt-10 pb-10">
             <div className="rounded-full h-12 w-12 bg-green-400 flex justify-center mt-1 mr-2">
        <div className="flex flex-col justify-center  items-center text-lg h-full">
            {state.user.firstName.charAt(0)}
        </div>
        </div>
        <div className="font-bold text-lg">
            {state.user.firstName+" "+state.user.lastName}
        </div>
          
           

    </div>
            <InputBox onChange={(e)=>{
                setAmount(parseInt(e.target.value))
            }} placeholder={"Enter amount"} label={"Amount in Rs"}></InputBox>
            
            <div className="pt-4">
                <div>
                <button onClick={async ()=>{
                    try{
                        const token = localStorage.getItem('token');
                        const headers = {
                          'authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json',
                        };
                        let response= await axios.post("http://localhost:3000/api/v1/account/transfer",{
                        to:state.user._id,
                        amount:amount
                    },{headers})
                    console.log(response.data)
                    if(response.data.message === "Transfer successful"){
                        setMessage('Money transferred successfully!');
        setShowMessage(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000); // Redirect after 3 seconds
      }
                    }
                    
                    
                    catch(err){
                            console.log(err)
                    }
                    



                }} type="button" className="w-full text-white bg-green-400 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Initiate Transfer</button>

                </div>
                
            </div>
            

            </div>
        </div>
        {showMessage && <FlashMessage message={message} onClose={() => setShowMessage(false)} />}

    </div>
}
