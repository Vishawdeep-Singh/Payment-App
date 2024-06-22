export const Balance=({balance})=>{
return <div className="flex p-5">
     <div className="font-bold sm:text-lg text-base">
            Your balance
        </div>
        <div className="font-semibold ml-4 sm:text-lg text-base">
            Rs  {balance}
        </div>
</div>
}