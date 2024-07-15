import React from 'react'
import SignUpFormProvider from '@/src/components/forms/sign-up/form-provider';
import RegistrationFormStep from '@/src/components/forms/sign-up/registration-form-step';
import ButtonHandler  from '@/src/components/forms/sign-up/button-handler';
import HighlightBar from '@/src/components/forms/sign-up/hignlight-bar';
type Props = {}

const Signup= (props: Props) => {
  return (
    <div className='flex-1 py-36 md:px-16 w-full'>
      <div className='flex flex-col h-full gap-3'>
        <SignUpFormProvider>
          <div className='flex flex-col gap-3'>
        <RegistrationFormStep/>
    <ButtonHandler/>
       </div>
       <HighlightBar/> 
        </SignUpFormProvider>
      </div>
    </div>
  )
}

export default Signup