"use client";
import { useAuthContextHook } from '@/src/context/use-auth-context';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form'
import TypeSelectionForm from './type-selection-form';
import dynamic from 'next/dynamic';
import { Spinner } from '../../spinnner';
import OTPForm from './otp-form';

const DetailForm = dynamic(() => import('./account-details-form'), {
  ssr: false,
loading: Spinner,
})
const OTPform = dynamic(() => import('./otp-form'), {
  ssr: false,
loading: Spinner,
})

type Props = {}

function RegistrationFormStep({}: Props) {
    const {register,formState: {errors}, setValue} = useFormContext();

    const {currentStep} = useAuthContextHook();
    const [onOTP, setOnOTP] = useState<string>('')
    const [onUserType, setOnUserType] = useState<'owner' | 'student'>('owner')

    setValue('otp', onOTP)

    switch (currentStep) {
        case 1: return (
            <TypeSelectionForm  register={register} userType={onUserType} setUserType={setOnUserType}/>
        )
        case 2: return(
          <DetailForm
          errors={errors}
          register={register}
          />
        )

        case 3: return (
          <OTPform onOTP={onOTP} setOTP={setOnOTP}/>
        )
    }
  return (
    <div>registration-form-step</div>
  )
}

export default RegistrationFormStep