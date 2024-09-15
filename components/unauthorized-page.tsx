"use client"

import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import Link from 'next/link'
import { ArrowLeftIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

const UnauthorizedPage = () => {
    const router =  useRouter()
  return (
    <div className="flex justify-center items-center h-[70vh] w-full">
        <Card className="bg-muted/40">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Unauthorized</CardTitle>
                <CardDescription className='max-w-sm'>You are not authorized to acces this page. Either go back, sign out and sign in with an admin account, or go to the home page.</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-row md:justify-end gap-2">
                <Button variant="outline" onClick={()=> router.back()}><ArrowLeftIcon className="mr-2" /> Go Back</Button>
                <Button onClick={()=>router.push("/auth/sign-out")}><PersonIcon className="mr-2"/>Sign Out</Button>
                <Button><Link className="flex" href="/">Go Home <HomeIcon className="ml-2"/></Link></Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default UnauthorizedPage