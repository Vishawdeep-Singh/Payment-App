export const InputBox = ({onChange,label,placeholder})=>{

    return <div>
        <div className="text-sm font-medium text-left py-2">
          {label}
        </div>
        
        <input onChange={onChange} placeholder={placeholder} type="text" className=" w-full px-2 py-1 border rounded-md focus:outline-black" />
    </div>
}