export const APP_NAME = 'SkillMatrix Pro'
export const APP_VERSION = '3.2.1'
export const APP_TAGLINE = 'Enterprise Assessment Platform'

export const MOCK_DELAY_MIN = 300
export const MOCK_DELAY_MAX = 700

export const DEFAULT_PAGE_SIZE = 10

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Assessments', path: '/assessments', icon: 'ClipboardList' },
  { label: 'Candidates', path: '/candidates', icon: 'Users' },
  { label: 'Analytics', path: '/analytics', icon: 'BarChart3' },
  { label: 'Settings', path: '/settings', icon: 'Settings' },
] as const

export const STATUS_COLORS = {
  active: 'emerald',
  draft: 'amber',
  archived: 'gray',
  scheduled: 'blue',
  completed: 'emerald',
  in_progress: 'blue',
  invited: 'violet',
  expired: 'amber',
  disqualified: 'red',
  operational: 'emerald',
  degraded: 'amber',
  outage: 'red',
} as const

export const DIFFICULTY_COLORS = {
  Beginner: 'emerald',
  Intermediate: 'blue',
  Advanced: 'violet',
  Expert: 'rose',
} as const

export const CHART_COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  muted: '#94a3b8',
  grid: '#e2e8f0',
  gridDark: '#1e293b',
}

export const MOCK_CREDENTIALS = {
  email: 'admin@skillmatrix.pro',
  password: 'Admin123!',
}
