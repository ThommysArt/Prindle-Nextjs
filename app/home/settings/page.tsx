import { Suspense } from 'react'
import { ThemeSwitcher } from './_components/theme-switcher'
import { UserAccountCard } from './_components/user-account-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PersonIcon } from '@radix-ui/react-icons'

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10 text-">
      {/* Top status bar */}
      <div className="flex w-full h-14">
        <div className="fixed top-5 z-50 flex items-center gap-4 w-full border-b px-6 py-2">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </div>
      <div className="space-y-8 mx-4 md:mx-10">
        <section>
          <h2 className="text-xl font-semibold mb-4">Theme</h2>
          <ThemeSwitcher />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">User Account Portal</h2>
          <Suspense fallback={<Skeleton className="w-full max-w-sm h-[200px]" />}>
            <UserAccountCard />
          </Suspense>
        </section>
        <section>
          <Button variant="destructive">
            <Link href="/auth/sign-out" className="flex gap-2">
              <PersonIcon /> Sign Out
            </Link>
          </Button>
        </section>
      </div>
    </div>
  )
}