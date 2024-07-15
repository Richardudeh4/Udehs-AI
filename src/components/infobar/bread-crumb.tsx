"use client";
import React from 'react'

type Props = {}

const BreadCrumb = (props: Props) => {
  return (
    <div className='flex flex-col'>
      <div className='flex gap-5 items-center'>
        <h2 className='text-3xl font-bold capitalize '>title </h2>
        
      </div>
      <p className='text-gray-500 text-sm'>
      Modify domain settings, change chatbot options, enter sales questions and train your bot to do what you want it to.
            {/* {
                page == 'settings'
                ? 'Manage your account settings, preferences and integration'
                : page == 'dashboard'
                ? 'A detailed overview of our metries, usage, customers and more'
                : page  ==  'appointment'
                ? 'View and Edit all your appointments'
                : page == 'email-marketing'
                ? 'Send bulk emails to your customers'
                : page == 'integration'
                ? 'Connect third-party applications to udehs AI'
                : 'Modify domain settings, change chatbot options, enter sales questions and train your bot to do what you want it to.  '
            } */}
      </p>
     </div>
  )
}

export default BreadCrumb