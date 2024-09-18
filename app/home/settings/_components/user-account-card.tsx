import { auth } from '@/auth'
import { prisma } from '@/prisma/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

export async function UserAccountCard() {
  const session = await auth()
  if (!session?.user?.email) {
    return <div>Not authenticated</div>
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { accounts: true }
  })

  if (!user) {
    return <div>User not found</div>
  }

  const authMethod = user.accounts[0]?.provider || 'Email/Password'

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>User Account Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
            <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-semibold">Authentication Method</TableCell>
                        <TableCell>{authMethod}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-semibold">Account created</TableCell>
                        <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-semibold">Last Updated</TableCell>
                        <TableCell>{user.updatedAt.toLocaleDateString()}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  )
}