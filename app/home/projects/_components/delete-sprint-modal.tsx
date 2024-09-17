"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { prisma } from '@/prisma/prisma'

interface DeleteSprintModalProps {
  sprintId: string
  sprintTitle: string
}

export function DeleteSprintModal({ sprintId, sprintTitle }: DeleteSprintModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await prisma.sprint.delete({
        where: { sprintId: sprintId }
      })
      toast({ title: 'Sprint deleted successfully' })
      setIsOpen(false)
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete sprint', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this sprint?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the sprint "{sprintTitle}" and all its associated tasks.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}