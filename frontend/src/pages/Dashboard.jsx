import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

 export const Dashboard=()=>{
    const [balance, setBalance] = useState(); // State to store fetched data
    const [info,setInfo]=useState();
    const [isLoading, setIsLoading] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const navigate=useNavigate();

    async function fetchBalance(){
      try{
        const token = localStorage.getItem("token")
        
        if (!token) {
          throw new Error('Token not found.');
        }
            const headers = {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', // Optional: Set other headers if needed
              };
          const response = await axios.get('http://localhost:3000/api/v1/account/balance', { headers });
          setBalance(response.data.balance)
      }
      catch(err){
       
        setMessage(err.response.data.msg)
        setShowMessage(true)
      }
       

    }
    async function fetchInfo(){
      try{
        const token = localStorage.getItem("token")
       
    if (!token) {
      throw new Error('Token not found.');
    }
        const headers = {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Optional: Set other headers if needed
          };
        const response= await axios.get("http://localhost:3000/api/v1/user/info",{ headers });
        
        setInfo(response.data)
      }
      catch(err){
        console.log(err.response.data.msg)
        setMessage(err.response.data.msg)
        setShowMessage(true)
      }
     
        
    }
    useEffect(()=>{
        fetchBalance()
    },[])
    useEffect(()=>{
        fetchInfo();
      
    },[])
    useEffect(() => {
        const fetchData = async () => {
          try {
            await Promise.all([fetchBalance(), fetchInfo()]);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setIsLoading(false); // Set loading to false after data fetching
          }
        };
        fetchData();
      }, []);
   
      if (isLoading) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        );
      }
      if(message==="Invalid token" && showMessage) {
       return( <div className=" w-[80%] m-auto mt-96 bg-red-500 text-white p-3 rounded shadow-lg text-center text-4xl">
      {message}
      <button onClick={()=>{
        setShowMessage(false)
        navigate("/signup")
      }} className="ml-9 text-base underline">
        Sign Up
      </button>
      <button onClick={()=>{
        setShowMessage(false)
        navigate("/signin")
      }} className="ml-3 text-base underline">
        Sign In
      </button>
    </div>)
      } 
      if(message==="Token has expired" && showMessage) {
       return( <div className=" bg-red-500 text-white p-3 rounded shadow-lg text-center text-4xl">
      {message}
      <button onClick={()=>{
        setShowMessage(false)
        navigate("/signup")
      }} className="ml-9 text-base underline">
        Sign Up
      </button>
      <button onClick={()=>{
        setShowMessage(false)
        navigate("/signin")
      }} className="ml-3 text-base underline">
        Sign In
      </button>
    </div>)
      } 
      if(message==="Internal server error" && showMessage) {
       return( <div className=" bg-red-500 text-white p-3 rounded shadow-lg text-center text-4xl">
      {message}
      <button onClick={()=>{
        setShowMessage(false)
        navigate("/signup")
      }} className="ml-9 text-base underline">
        Sign Up
      </button>
      <button onClick={()=>{
        setShowMessage(false)
        navigate("/signin")
      }} className="ml-3 text-base underline">
        Sign In
      </button>
    </div>)
      } 
      if (!info) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="bg-red-500 text-white p-3 rounded shadow-lg text-center">
              Unable to load user information.
            </div>
          </div>
        );
      }
    return <div>
        <Appbar info={info}></Appbar>

        <div className="w-[95%]">
            <Balance balance={balance}>


        </Balance>
     
        <Users id={info._id}></Users> 
        </div>
       
        
    </div>
 }