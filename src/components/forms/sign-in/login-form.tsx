'use client'; 

import { USER_LOGIN_FORM } from '@/src/constants/form';
import React from 'react'
import { useFormContext } from 'react-hook-form';
import FormGenerator from '../form-generator';

type Props = {}

const LoginForm = (props: Props) => {
    const {register, formState: {errors}} = useFormContext();
  return (
    <>
    <h1 className='text-gravel md:text-4xl font-bold'>Login</h1>
    <p className='text-iridium md:text-sm'>You will receive a one time password</p>
    {
        USER_LOGIN_FORM.map((field) => (
            <FormGenerator
             key={field.id}
              {...field}
              errors={errors}
              register={register}
              name={field.name }
              />
        ))
    }
    </>
  )
}

export default LoginForm