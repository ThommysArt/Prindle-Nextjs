"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { EnvelopeClosedIcon, ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input"
import React, { useState, useTransition } from 'react'
import { NewOrgSchema } from '@/constants/zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from '@/hooks/use-toast'
import { BeatLoader } from 'react-spinners'
import { createOrganisation } from '@/actions/org'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const NewOrgForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const { data: session } = useSession()
    const router = useRouter()

    const {toast} = useToast()

    const form = useForm<z.infer<typeof NewOrgSchema>>({
        resolver: zodResolver(NewOrgSchema),
        defaultValues: {
          name: "",
        },
      })
      
      function onSubmit(values: z.infer<typeof NewOrgSchema>) {
        setError("");
        setSuccess("");

        startTransition(async () => {
            
            createOrganisation(values.name, session?.user?.id!)
            .then((org)=> {
                toast({
                    title: "Organisation Created Successfully",
                    description: `${org.name} Org has been created. You can now manage your projects and team.`,
                })
                router.push(`/home/organisations/manage/${org.orgId}`)
            })
            .catch(() => setError("Something went wrong"))
        })
      }
  return (
    <Card className="max-w-sm">
        <CardHeader>
            <CardTitle>Create an Organisation</CardTitle>
            <CardDescription className="max-w-sm">Need your company or enterprize in full collaboration, we got you!</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Example LT" {...field} disabled={isPending}/>
                        </FormControl>
                        <FormDescription>
                            This is the name of your new organisation.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    {error && (
                        <Alert variant="destructive">
                        <ExclamationTriangleIcon className="h-6 w-6" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {success && (
                        <Alert>
                        <RocketIcon className="h-6 w-6"/>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit">
                        {isPending===false ? ("Submit"):(<BeatLoader />)}
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}
