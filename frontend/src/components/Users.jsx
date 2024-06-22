import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export const Users=({id})=>{
const [users,SetUsers]= useState();
const [filterVal,setfilterval]=useState("")
const [isLoading, setIsLoading] = useState(true);
const navigate = useNavigate();

    useEffect(()=>{
        const fetchUsers = async () => {
            try {
              const response = await axios.get('https://payment-app-zaq2.onrender.com/api/v1/user/bulk?filter='+filterVal);
              SetUsers(response.data.user);
            } catch (error) {
              console.error('Error fetching users:', error);
              // Handle error state if needed
            } finally {
              setIsLoading(false); // Set loading to false after data fetching
            }
          };

      
          fetchUsers();
    },[filterVal]);
    if (isLoading) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        );
      }
return <div className="flex flex-col justify-evenly p-5">
    <div className="font-bold sm:text-lg text-base">
        Users
    </div>
   <input onChange={(e)=>{
    setfilterval(e.target.value)
   }} placeholder="Search users" type="text" className="w-full border rounded-md h-9 focus:outline-black placeholder-gray-500 placeholder-ml-5 p-5 mt-5 mx-3" />
   {users.map((user,index)=>{
    if (user._id === id) {
        return null; // Skip rendering this user
      }
    return <div key={index} className="flex justify-between mt-[25px] px-1" >
    <div className="flex items-center">
         <div className="rounded-full sm:h-12 sm:w-12 bg-gray-200 flex justify-center mt-1 mr-2 h-9 w-9">
        <div className="flex flex-col justify-center  items-center text-lg h-full">
           {user.firstName.charAt(0)}
        </div>

    </div>
    <div className="sm:text-lg text-sm font-bold pl-4">{user.firstName+" "+user.lastName}</div>
    </div>
  

    <div className="flex">
    <button onClick={ async()=>{
       
      navigate("/send",{state:{user}})
    }} type="button" className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm sm:px-5 sm:py-2.5 px-2 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Send Money</button>

    </div>
   </div>
   })}
   

   
</div>
}