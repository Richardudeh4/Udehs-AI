import Infobar from '@/src/components/infobar'
import BillingSettings from '@/src/components/settings/billing-settings'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <>
<Infobar/>
<div className='overflow-y-auto w-full chat-window flex-1 h-0 flex flex-col gap-10'>
<BillingSettings/>
</div>
    </>
  )
}

export default page