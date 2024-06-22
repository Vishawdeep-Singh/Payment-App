import { useNavigate } from "react-router-dom"

export const Appbar=({info})=>{
const navigate=useNavigate()
return <div className="shadow h-14 flex justify-between items-center">
    <div className="flex flex-col justify-center h-full ml-4 font-extrabold sm:text-xl text-sm">PayTM App</div>
    <div>
      <button onClick={()=>{
        navigate("/signin")
        localStorage.setItem("token",undefined)
      }} type="button" className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm sm:px-5 sm:py-2.5   dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">LogOut</button>
     </div>
    <div className="flex items-center">
       <div className="flex flex-col justify-center h-full mr-4 text-sm sm:text-lg">
    Hello , {info.firstName+" "+info.lastName}
     </div>
     
    <div className="rounded-full sm:h-12 sm:w-12 bg-slate-200 flex justify-center mt-1 mr-2 h-9 w-9">
        <div className="flex flex-col justify-center  items-center text-lg h-full">
          {info.firstName.charAt(0)}
        </div>

    </div>
 
    </div>
     
</div>
}