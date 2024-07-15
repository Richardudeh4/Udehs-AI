"use client";
import { AuthContextProvider } from '@/src/context/use-auth-context'
import { FormProvider } from 'react-hook-form'
import React from 'react'
import { useSignUpForm } from '@/src/hooks/sign-up/use-sign-up'
import Loader from '@/src/components/loader'

type Props = {
  children:React.ReactNode
}

const SignUpFormProvider = ({children }: Props) => {
  const {methods,onHandleSubmit,loading} = useSignUpForm();
  return (
    <AuthContextProvider>
        <FormProvider {...methods}>
          <form onSubmit={onHandleSubmit} className='w-full'>
            <div className='flex flex-col justify-between gap-3 h-full'>
             <Loader loading={loading}>{children}</Loader>
            </div>
          </form> 
        </FormProvider>
    </AuthContextProvider>
  )
}

export default SignUpFormProvider