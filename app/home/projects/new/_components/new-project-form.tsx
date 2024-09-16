"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
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
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Textarea } from '@/components/ui/textarea'
import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import React, { useState, useTransition } from 'react'
import { NewProjectSchema } from '@/constants/zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { BeatLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'
import { createProject } from '@/actions/project'
import { Organisation } from '@prisma/client'
import { cn } from '@/lib/utils'

export const NewProjectForm = ({orgs}: {orgs: Organisation[]}) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    const form = useForm<z.infer<typeof NewProjectSchema>>({
        resolver: zodResolver(NewProjectSchema),
        defaultValues: {
          name: "",
          description: "",
          orgId: ""
        },
      })
      
      function onSubmit(values: z.infer<typeof NewProjectSchema>) {
        setError("");
        setSuccess("");

        startTransition(async () => {
            
            createProject(values.name, values.description, values.orgId)
            .then((project)=> {
                setSuccess(`${project.name} Project Created Successfully`)
                router.push(`/home/projects/manage/${project.projectId}`)
            })
            .catch(() => setError("Something went wrong"))
        })
      }
  return (
    <Card className="max-w-sm my-10">
        <CardHeader>
            <CardTitle>Create a Project</CardTitle>
            <CardDescription className="max-w-sm">Let's start a new project. Discover our project management utilities</CardDescription>
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
                                <Input placeholder="E-Commerce Website" {...field} disabled={isPending}/>
                            </FormControl>
                            <FormDescription>
                                This is the name of your new Project.
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
                                <Textarea placeholder="This is a website for our client partners at..." {...field} disabled={isPending}/>
                            </FormControl>
                            <FormDescription>
                                This is the description of your new Project.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="orgId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Organisation</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value
                                        ? orgs.find(
                                            (org) => org.orgId === field.value
                                        )?.name
                                        : "Select organisation"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput
                                    placeholder="Search framework..."
                                    className="h-9"
                                    />
                                    <CommandList>
                                    <CommandEmpty>No Organisation found.</CommandEmpty>
                                    <CommandGroup>
                                        {orgs.map((org) => (
                                        <CommandItem
                                            value={org.name}
                                            key={org.orgId}
                                            onSelect={() => {
                                            form.setValue("orgId", org.orgId)
                                            }}
                                        >
                                            {org.name}
                                            <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                org.orgId === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                            />
                                        </CommandItem>
                                        ))}
                                    </CommandGroup>
                                    </CommandList>
                                </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Choose your organisation.
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
