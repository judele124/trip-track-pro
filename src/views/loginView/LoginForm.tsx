import { Fragment, InputHTMLAttributes, useEffect, useState } from "react";
import InputWLabel from "../../components/ui/InputWLabel";
import Button from "../../components/ui/Button";
import { useForm } from "react-hook-form";
import useAxios from '../../hooks/useAxios'
import { useNavigate } from "react-router-dom";


type IFormData = {
  email: string;
  name: string;
  code: string;
};
const LoginFrom = () => {
  const [isFinished, setIsFinished] = useState(0);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const fromStates: inputName[][] = [
    ["name","email"],
    [ "code"],
  ] 

  const httpRouts = ['auth/send-code', 'auth/verify-code']

  const {activate, loading, status } = useAxios({
    method: 'POST',    
    manual: true
  })
  const onSubmit = (data : IFormData) => {
    if(isFinished === 1){
      delete (data as { name?: string }).name
    }
    
    activate({url: httpRouts[isFinished], data})
    if(status === 202 && isFinished === 1) navigate('/')
    setIsFinished((prev) => (prev + 1) % 2); 
  };
 
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      {fromStates[isFinished].map((item ) => {
        const inputFieldProps = inputsFieldsProps.find((field) => field.name === item)
        return <Fragment key={item}>
        <InputWLabel {...inputFieldProps} {...register(item)} /> 
        {errors[item] && <p>{errors[item].message}</p>}
        </Fragment>
      })}
        
      
      <Button primary type="submit">
       {loading ? 'Loading...' : isFinished === 0 ? 'Send code' : 'submit'}
      </Button>
    </form>
  );
};

export default LoginFrom;

type inputName = "name" | "email" | "code";
const inputsFieldsProps:InputHTMLAttributes<HTMLInputElement>[] = [
  {
    type: 'text',
    name: "name",
    title: "Enter name",
    placeholder: "Enter name",
  },
  {
    type: "email",
    name: "email",
    title: "Enter mail address",
    placeholder: "Enter mail address",
  },
  {
    type: "text",
    name: "code",
    title: "Enter 2 digits code",
    placeholder: "Enter 2 digits code",
  },
];