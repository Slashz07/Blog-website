import React from 'react'

function Button({
    text,
    bgColor="bg-blue-600",
    textColor="text-white",
    type="button",
    className="",
    ...props
}) {
  return (
    <button type={type} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} `} 

      {...props}>{text}</button>
  )
}

export default Button