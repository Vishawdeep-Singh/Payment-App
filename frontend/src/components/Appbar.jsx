export const Appbar=({info})=>{

return <div className="shadow h-14 flex justify-between">
    <div className="flex flex-col justify-center h-full ml-4 font-extrabold text-xl">PayTM App</div>
    <div className="flex">
       <div className="flex flex-col justify-center h-full mr-4">
    Hello , {info.firstName+" "+info.lastName}
     </div>
    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
        <div className="flex flex-col justify-center  items-center text-lg h-full">
          {info.firstName.charAt(0)}
        </div>

    </div>
 
    </div>
     
</div>
}