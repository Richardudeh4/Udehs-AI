"use client";
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useToast } from '../components/ui/use-toast';
import { useChatContext } from './user-chat-context';
import { onGetConversationMode, onToggleRealTime } from '../actions/conversation';
import { onGetAllAccountDomains } from '../actions/settings';
import { useClerk } from '@clerk/nextjs';



const useSideBar = () => {
    const [expand, setExpand] = useState<boolean | undefined>(undefined)
    const router = useRouter();
    const pathName = usePathname();
    const {toast} = useToast();
    const [ realtime, setRealTime] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const {chatRoom}  = useChatContext();
    const onActivateRealtime = async(e: any) => {
        try{
            const realtime = await onToggleRealTime(
                chatRoom!,
                e.target.ariaChecked == 'true' ? false : true
            )
            if(realtime){
                setRealTime(realtime.chatRoom.live)
                toast({
                    title: 'Success',
                    description: realtime.message,
                })
            }
        }
        catch(error){
            console.log(error)
        }
    } 
    const onGetCurrentMode = async () => {
        setLoading(true);
        const mode = await onGetConversationMode(chatRoom!)
        if(mode){
            setRealTime(mode.live)
            setLoading(false); 
        }
    }

    useEffect(() => {
            if(chatRoom){
                onGetCurrentMode();
            }
    },[chatRoom])

    const page = pathName.split('/').pop()
    const {signOut } = useClerk();

    const onSignOut = () => signOut(() => router.push('/'))
    const onExpand = () => setExpand((prev) => !prev)

  return {
    expand,onExpand,page,onSignOut,realtime,onActivateRealtime,chatRoom,loading
  }
}
export default useSideBar