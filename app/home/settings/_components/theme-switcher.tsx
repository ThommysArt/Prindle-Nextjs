"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Laptop } from 'lucide-react'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex space-x-2">
      <Button
        variant={theme === 'system' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('system')}
        title="System theme"
      >
        <Laptop className="h-5 w-5" />
      </Button>
      <Button
        variant={theme === 'light' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('light')}
        title="Light theme"
      >
        <Sun className="h-5 w-5" />
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('dark')}
        title="Dark theme"
      >
        <Moon className="h-5 w-5" />
      </Button>
    </div>
  )
}