import React, { useId } from 'react'

React.forwardRef(function Select({
    label,
    options,
    className="",
    ...props
},ref) {

    const id=useId()
    return (
      <div className='w-full'>
        {label && <label htmlFor={id}
        className='nline-block pl-1 mb-1'
        >
            label
        </label>}
        <select 
        ref={ref}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        >
            {options.mapimport React, { useId } from 'react'

React.forwardRef(function Select({
    label,
    options,
    className="",
    ...props
},ref) {

    const id=useId()
    return (
      <div className='w-full'>
        label && <label htmlFor={id}
        className='nline-block pl-1 mb-1'
        >
            {label}
        </label>
        <select 
        ref={ref}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        >
            {options.map((option,index)=>(
                <option key={index} value={option}>
                    {option}
                </option>
            ))}

        </select>
      </div>
    )
  }
  )
export default Select}

        </select>
      </div>
    )
  }
  )
export default Select