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
import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import React, { useState, useTransition } from 'react'
import { NewTeamSchema } from '@/constants/zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from '@/hooks/use-toast'
import { BeatLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { createTeam } from '@/actions/teams'

export function NewTeamForm({orgId}: {orgId: string}) {
  const [error, setError] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof NewTeamSchema>>({
    resolver: zodResolver(NewTeamSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })
  
  function onSubmit(values: z.infer<typeof NewTeamSchema>) {
    setError("")

    startTransition(async () => {
      try {
        const team = await createTeam(
            values.name,
            values.description,
            orgId,
        )
        toast({
          title: "Team Created Successfully",
          description: `${team.name} team has been created. You can now manage your projects and team.`,
        })
        router.push(`/home/organisations/manage/${team.orgId}`)
      } catch (err) {
        setError("Something went wrong")
      }
    })
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create a Team</CardTitle>
        <CardDescription>Let's divide your organisation into teams for more efficiency and collaboration</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Developers Team" {...field} disabled={isPending}/>
                  </FormControl>
                  <FormDescription>
                    This is the name of your new team.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="The frontend and backend developers, devops engineers,..." {...field} disabled={isPending}/>
                  </FormControl>
                  <FormDescription>
                    This is the description of your new team.
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
            <Button type="submit" disabled={isPending}>
              {isPending ? <BeatLoader size={8} color="currentColor" /> : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}