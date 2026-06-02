import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, ClipboardList, Users, BarChart3,
  Settings, ChevronLeft, ChevronRight, Zap, ExternalLink,
  HelpCircle, Shield,
} from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useAuthStore } from '@/store/authStore'
import { cn, getInitials, generateAvatarColor } from '@/lib/utils'
import { APP_NAME, APP_VERSION } from '@/lib/constants'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const NAV_ITEMS = [
  { label: 'Dashboard',   path: '/dashboard',   icon: LayoutDashboard },
  { label: 'Assessments', path: '/assessments', icon: ClipboardList },
  { label: 'Candidates',  path: '/candidates',  icon: Users },
  { label: 'Analytics',   path: '/analytics',   icon: BarChart3 },
  { label: 'Settings',    path: '/settings',    icon: Settings },
]

const SECONDARY_ITEMS = [
  { label: 'System Status', path: '/status', icon: Zap, external: false },
  { label: 'Help & Docs',   path: '#',       icon: HelpCircle, external: true },
]

export function Sidebar() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed)
  const toggle = useUIStore((s) => s.toggleSidebar)
  const user = useAuthStore((s) => s.user)
  const location = useLocation()

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative flex h-screen flex-col bg-sidebar border-r border-sidebar-border overflow-hidden shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-sm font-bold text-sidebar-foreground whitespace-nowrap leading-tight">
                  {APP_NAME}
                </p>
                <p className="text-[10px] text-sidebar-foreground/50 whitespace-nowrap">v{APP_VERSION}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname.startsWith(item.path)
          return (
            <Tooltip key={item.path} delayDuration={0}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.path}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-foreground'
                      : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'
                  )}
                >
                  <Icon className={cn('h-4.5 w-4.5 shrink-0', isActive ? 'text-primary' : 'text-current')} size={18} />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && !collapsed && (
                    <motion.div
                      layoutId="active-indicator"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                    />
                  )}
                </NavLink>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
            </Tooltip>
          )
        })}

        <div className="my-3 border-t border-sidebar-border" />

        {SECONDARY_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <Tooltip key={item.path} delayDuration={0}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.path}
                  className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-sidebar-foreground/50 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-colors"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="whitespace-nowrap overflow-hidden flex items-center gap-1"
                      >
                        {item.label}
                        {item.external && <ExternalLink className="h-3 w-3" />}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
            </Tooltip>
          )
        })}
      </nav>

      {/* User info */}
      {user && (
        <div className={cn('border-t border-sidebar-border p-3', collapsed ? 'flex justify-center' : '')}>
          <div className="flex items-center gap-2 overflow-hidden">
            <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white', generateAvatarColor(user.name))}>
              {getInitials(user.name)}
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs font-semibold text-sidebar-foreground truncate">{user.name}</p>
                  <p className="text-[10px] text-sidebar-foreground/50 truncate capitalize">{user.role}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={toggle}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground/60 hover:text-sidebar-foreground shadow-sm transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </motion.aside>
  )
}
