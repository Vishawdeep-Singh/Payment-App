import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

 export const Dashboard=()=>{
    const [balance, setBalance] = useState(); // State to store fetched data
    const [info,setInfo]=useState();
    const [isLoading, setIsLoading] = useState(true);
    async function fetchBalance(){
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
    async function fetchInfo(){
     
        const token = localStorage.getItem("token")
       
    if (!token) {
      throw new Error('Token not found.');
    }
        const headers = {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Optional: Set other headers if needed
          };
        const response= await axios.get("http://localhost:3000/api/v1/user/info",{ headers });
        console.log(response.data)
        setInfo(response.data)
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
    return <div>
        <Appbar info={info}></Appbar>

        <div className="w-[95%]">
            <Balance balance={balance}>


        </Balance>
        <Users id={info._id}></Users> 
        </div>
       
       
    </div>
 }