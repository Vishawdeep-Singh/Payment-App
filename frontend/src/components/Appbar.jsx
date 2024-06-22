export const Appbar=({info})=>{

return <div className="shadow h-14 flex justify-between">
    <div className="flex flex-col justify-center h-full ml-4 font-extrabold sm:text-xl text-sm">PayTM App</div>
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