import { clsx } from 'clsx';
import React from 'react' 
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
interface inputprops{
    label:string;  
    id:string; 
    type:string; 
    required?:boolean;
    value?:string
    onChange:(event: React.ChangeEvent<HTMLInputElement>)=>void,
    disabled?:boolean;
     



}

const Input:React.FC<inputprops> = ({label, id, value, required, onChange,type='text',disabled}) => {
  return (
    <div>
        <label htmlFor={id}  className=' block text-sm font-medium leading-6 text-gray-600'>{label}</label> 
        <input type={type} id={id}  autoComplete={id} disabled={disabled} value={value} onChange={onChange} className={clsx('form-input block w-full rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-intset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:text-sky-400 sm:tex-sm sm:leading-6', disabled&&'opacity-50 cursor-default')} required={required}/>
    </div>
  )
}

export default Input