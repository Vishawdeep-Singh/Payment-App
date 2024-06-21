export const Balance=({balance})=>{
return <div className="flex p-5">
     <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs  {balance}
        </div>
</div>
}