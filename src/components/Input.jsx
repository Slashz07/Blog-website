import React,{useId} from 'react'

const Input=React.forwardRef(function Input({
    label,
    type="text",
    className="",
    name,
    ...props
},ref) {

    const id=useId()
    return (
      <div className='w-full'>{

        label && <label htmlFor={id}
        className="block w-full pl-1 mb-1 text-left"
        >
            {label}
        </label>
        }
        <input type={type} 
        className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        name={name}
        {...props}
        id={id}
        />

        </div>
    )
  }
  )
export default Input