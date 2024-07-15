"use client";

import {  useAuthContextHook } from '@/src/context/use-auth-context';
import { cn } from '@/src/lib/utils';
import React from 'react'

type Props = {}

const HighlightBar= (props: Props) => {
    const { currentStep} = useAuthContextHook();
  return (
    <div className='grid gap-3 grid-cols-3'>
        <div className={cn("rounded-full h-2 col-span-1", currentStep == 1 ? 'bg-green-400' : 'bg-platinum ')}>
        </div>
        <div className={cn("rounded-full h-2 col-span-1", currentStep == 2 ? 'bg-green-400' : 'bg-platinum')}>
        </div>
        <div className={cn("rounded-full h-2 col-span-1", currentStep == 3 ? 'bg-green-400' : 'bg-platinum')}>
        </div>
    </div>
  )
}

export default HighlightBar