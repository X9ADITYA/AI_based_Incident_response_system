import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, CheckCheck, X, Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { useNotificationStore } from '@/store/notificationStore'
import { Button } from '@/components/ui/button'
import { cn, formatRelativeTime } from '@/lib/utils'
import type { Notification, NotificationType } from '@/types'

const ICON_MAP: Record<NotificationType, { icon: typeof Info; className: string }> = {
  info:    { icon: Info,          className: 'text-blue-500' },
  success: { icon: CheckCircle2,  className: 'text-emerald-500' },
  warning: { icon: AlertTriangle, className: 'text-amber-500' },
  error:   { icon: XCircle,       className: 'text-red-500' },
}

interface NotificationCenterProps {
  open: boolean
  onClose: () => void
}

export function NotificationCenter({ open, onClose }: NotificationCenterProps) {
  const { notifications, markAsRead, markAllAsRead, removeNotification } = useNotificationStore()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-10 z-50 w-96 rounded-xl border border-border bg-card shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-foreground" />
              <span className="text-sm font-semibold">Notifications</span>
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground font-bold">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </div>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground" onClick={markAllAsRead}>
              <CheckCheck className="mr-1 h-3 w-3" /> Mark all read
            </Button>
          </div>

          {/* Notification list */}
          <div className="max-h-[420px] overflow-y-auto divide-y divide-border">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Bell className="h-8 w-8 text-muted-foreground/40 mb-2" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  notif={notif}
                  onRead={() => markAsRead(notif.id)}
                  onRemove={() => removeNotification(notif.id)}
                />
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function NotificationItem({
  notif,
  onRead,
  onRemove,
}: {
  notif: Notification
  onRead: () => void
  onRemove: () => void
}) {
  const { icon: Icon, className: iconClass } = ICON_MAP[notif.type]
  return (
    <div
      className={cn(
        'relative flex gap-3 px-4 py-3 transition-colors hover:bg-muted/50 cursor-pointer',
        !notif.read && 'bg-primary/5'
      )}
      onClick={onRead}
    >
      {/* Unread dot */}
      {!notif.read && (
        <span className="absolute left-2 top-4 h-1.5 w-1.5 rounded-full bg-primary" />
      )}

      <div className="mt-0.5 shrink-0">
        <Icon className={cn('h-4 w-4', iconClass)} />
      </div>

      <div className="flex-1 min-w-0">
        <p className={cn('text-sm leading-tight', !notif.read && 'font-medium')}>{notif.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
        <p className="text-[10px] text-muted-foreground/70 mt-1">{formatRelativeTime(notif.timestamp)}</p>
      </div>

      <button
        className="shrink-0 opacity-0 group-hover:opacity-100 hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity p-0.5"
        onClick={(e) => { e.stopPropagation(); onRemove() }}
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}
