import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search, Bell, Moon, Sun, LogOut, User, ChevronDown, Settings } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { useNotificationStore } from '@/store/notificationStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { NotificationCenter } from '@/components/notifications/NotificationCenter'
import { cn, getInitials, generateAvatarColor } from '@/lib/utils'

const BREADCRUMBS: Record<string, string> = {
  '/dashboard':   'Dashboard',
  '/assessments': 'Assessments',
  '/candidates':  'Candidates',
  '/analytics':   'Analytics & Reports',
  '/settings':    'Settings',
  '/status':      'System Status',
}

export function TopNav() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const darkMode = useUIStore((s) => s.darkMode)
  const toggleDark = useUIStore((s) => s.toggleDarkMode)
  const unreadCount = useNotificationStore((s) => s.unreadCount)
  const [notifOpen, setNotifOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const breadcrumb = BREADCRUMBS[location.pathname] ?? 'SkillMatrix Pro'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6 sticky top-0 z-30">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <p className="text-xs text-muted-foreground hidden sm:block">SkillMatrix Pro</p>
        <span className="text-muted-foreground/40 hidden sm:block">/</span>
        <h2 className="text-sm font-semibold text-foreground">{breadcrumb}</h2>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:block w-56">
          <Input
            leftIcon={<Search className="h-3.5 w-3.5" />}
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="h-8 text-xs"
          />
        </div>

        {/* Dark mode toggle */}
        <Button variant="ghost" size="icon" onClick={toggleDark} className="h-8 w-8">
          {darkMode
            ? <Sun className="h-4 w-4 text-amber-500" />
            : <Moon className="h-4 w-4" />
          }
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="icon" className="h-8 w-8 relative" onClick={() => setNotifOpen(true)}>
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className={cn(
                'absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground',
                unreadCount > 9 && 'w-5'
              )}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>
          <NotificationCenter open={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        {/* User menu */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-accent transition-colors">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className={cn('text-xs text-white', generateAvatarColor(user.name))}>
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold leading-none">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">{user.role}</p>
                </div>
                <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <User className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
