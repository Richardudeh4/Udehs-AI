"use client";
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Label } from '../../ui/label';
import { Card, CardContent, CardDescription } from '../../ui/card';
import { cn } from '@/src/lib/utils';
import { User } from 'lucide-react';
import { Input } from '../../ui/input';

type Props = {
value: string
title: string
text: string
register: UseFormRegister<FieldValues>
userType: 'owner' | 'student'
setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>
}

function UserTypeCard({register, value, title, text, userType, setUserType }: Props) {
  return (
    <Label htmlFor={value}>
    <Card className={cn("w-full cursor-pointer", userType == value && 'border-green-400 ')}>
    <CardContent className='flex p-2 justify-between'>
    <div className='flex items-center gap-3'>
    <Card className={cn('flex justify-center p-3', userType == value && 'border-green-400 ')}>
    <User
    size={30}
    className={cn(userType == value ? 'text-green-600' : 'text-gray-400')}
    />
    </Card>
    <div className=''>
    <CardDescription className='font-bolc'>{title}</CardDescription>
    <CardDescription className='font-light'>{text}</CardDescription>
    </div>
    </div>
    <div>
        <div className={cn("w-4 h-4 rounded-full", userType == value ? 'bg-green-400' : 'bg-transparent ')}>
            <Input
            {...register('type', {onChange: (event) => setUserType(event.target.value),})}
            value={value}
            id={value}
            className='hidden'
            type="radio"
            />
        </div>
    </div>
    </CardContent>
    </Card>
    </Label>
  )
}

export default UserTypeCard