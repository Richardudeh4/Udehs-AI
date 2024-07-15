import { onLoginUser } from '@/src/actions/auth';
import Sidebar from '@/src/components/sidebar';
import { ChatProvider } from '@/src/context/user-chat-context';
import React from 'react'

type Props = {
    children: React.ReactNode
}

const OwnerLayout = async ({children}: Props) => {
    const authenticated = await onLoginUser();
    if(!authenticated) return null 
  return (
    <ChatProvider>
      <div className='flex h-screen w-full '>
<Sidebar domains={authenticated.domain}/>
      </div>
    </ChatProvider>
  )
}

export default OwnerLayout