import { create } from 'zustand'
import type { Notification, NotificationType } from '@/types'
import { mockNotifications } from '@/api/mock/data'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (n: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  removeNotification: (id: string) => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [...mockNotifications],
  unreadCount: mockNotifications.filter((n) => !n.read).length,

  markAsRead: (id) =>
    set((s) => {
      const notifications = s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      return { notifications, unreadCount: notifications.filter((n) => !n.read).length }
    }),

  markAllAsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  addNotification: (n) =>
    set((s) => {
      const newNotif: Notification = {
        ...n,
        id: `notif-${Date.now()}`,
        timestamp: new Date().toISOString(),
        read: false,
      }
      const notifications = [newNotif, ...s.notifications]
      return { notifications, unreadCount: notifications.filter((x) => !x.read).length }
    }),

  removeNotification: (id) =>
    set((s) => {
      const notifications = s.notifications.filter((n) => n.id !== id)
      return { notifications, unreadCount: notifications.filter((n) => !n.read).length }
    }),
}))

// Convenience: add a toast-like notification
export function notify(
  type: NotificationType,
  title: string,
  message: string,
  actionLabel?: string
) {
  useNotificationStore.getState().addNotification({ type, title, message, actionLabel })
}
