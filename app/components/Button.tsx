import clsx from 'clsx';
import React from 'react' 
interface buttonprops{
    type?:'button' |'submit' | 'reset' | undefined; 
    fullwidth?:boolean; 
    children:React.ReactNode; 
    onclick?:()=>void; 
    secoundary?:boolean; 
    danger?:boolean; 
    disabled?:boolean
}

const Button:React.FC<buttonprops> = ({type='button', fullwidth, children, onclick, secoundary, danger, disabled}) => {
  return (
    <button onClick={onclick} type={type} disabled={disabled} className={clsx('flex justify-center  rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ',disabled &&'opacity-50 cursor-default', fullwidth &&" w-full", secoundary ? 'text-gray-900':"text-white", danger &&'bg-rose-500 hover:ng-rose-600 focus-visible:outline-rose-600 ', !secoundary && !danger &&'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600')}>{children}</button>
  )
}

export default Button