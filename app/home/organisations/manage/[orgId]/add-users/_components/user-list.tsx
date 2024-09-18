import { prisma } from '@/prisma/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export async function UserList({ orgId }: { orgId: string }) {
  const users = await prisma.organisationUser.findMany({
    where: { orgId },
    include: { user: true },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Members</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {users.map((orgUser) => (
            <li key={orgUser.orgUserId} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={orgUser.user.image || undefined} />
                <AvatarFallback>{orgUser.user.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{orgUser.user.name}</p>
                <p className="text-sm text-muted-foreground">{orgUser.user.email}</p>
              </div>
              <span className="ml-auto text-sm font-medium">{orgUser.role}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}