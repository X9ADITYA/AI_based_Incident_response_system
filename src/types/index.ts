// ─── Auth ────────────────────────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
  avatar: string | null
  role: 'admin' | 'manager' | 'viewer'
  organization: string
  department: string
  joinedAt: string
}

// ─── Assessment ───────────────────────────────────────────────────────────────
export type AssessmentStatus = 'active' | 'draft' | 'archived' | 'scheduled'
export type AssessmentDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
export type AssessmentCategory =
  | 'Frontend Development'
  | 'Backend Development'
  | 'Full Stack'
  | 'DevOps & Cloud'
  | 'Data Science'
  | 'Mobile Development'
  | 'Cybersecurity'
  | 'Database'
  | 'Soft Skills'
  | 'Project Management'

export interface Assessment {
  id: string
  title: string
  category: AssessmentCategory
  difficulty: AssessmentDifficulty
  duration: number
  questions: number
  status: AssessmentStatus
  candidates: number
  completionRate: number
  avgScore: number
  passingScore: number
  tags: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
  isPublic: boolean
  proctored: boolean
}

// ─── Candidate ────────────────────────────────────────────────────────────────
export type CandidateStatus = 'invited' | 'in_progress' | 'completed' | 'expired' | 'disqualified'

export interface SkillScore {
  name: string
  score: number
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  percentile: number
}

export interface AssessmentResult {
  assessmentId: string
  assessmentTitle: string
  score: number
  passingScore: number
  passed: boolean
  completedAt: string
  duration: number
  rank: number
  totalCandidates: number
}

export interface Candidate {
  id: string
  name: string
  email: string
  avatar: string | null
  phone: string
  role: string
  company: string
  location: string
  status: CandidateStatus
  assessmentsTaken: number
  avgScore: number
  skills: SkillScore[]
  results: AssessmentResult[]
  lastActivity: string
  invitedAt: string
  tags: string[]
  linkedIn: string | null
  experience: number
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export interface KPIMetric {
  label: string
  value: number | string
  change: number
  changeType: 'increase' | 'decrease'
  prefix?: string
  suffix?: string
  description: string
}

export interface DashboardData {
  kpis: KPIMetric[]
  assessmentTrend: MonthlyData[]
  completionTrend: MonthlyData[]
  recentActivity: ActivityItem[]
  systemStatus: SystemStatus[]
  skillDistribution: SkillDistItem[]
}

export interface MonthlyData {
  month: string
  value: number
  secondary?: number
}

export interface ActivityItem {
  id: string
  type: 'assessment_completed' | 'candidate_invited' | 'assessment_created' | 'report_generated' | 'candidate_passed'
  actor: string
  target: string
  timestamp: string
  meta?: Record<string, string | number>
}

export interface SystemStatus {
  service: string
  status: 'operational' | 'degraded' | 'outage'
  uptime: number
  latency: number
}

export interface SkillDistItem {
  skill: string
  count: number
  avgScore: number
}

// ─── Analytics ────────────────────────────────────────────────────────────────
export type TimeRange = '7d' | '30d' | '90d' | '1y'

export interface AnalyticsData {
  scoreDistribution: ScoreBucket[]
  categoryPerformance: CategoryPerf[]
  topSkills: SkillDistItem[]
  passRateTrend: MonthlyData[]
  candidateGrowth: MonthlyData[]
  assessmentCompletion: CompletionStat[]
}

export interface ScoreBucket {
  range: string
  count: number
  percentage: number
}

export interface CategoryPerf {
  category: string
  avgScore: number
  candidates: number
  passRate: number
}

export interface CompletionStat {
  category: string
  completed: number
  total: number
  rate: number
}

// ─── Notifications ────────────────────────────────────────────────────────────
export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  actionLabel?: string
  actionUrl?: string
}

// ─── API ──────────────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface FilterParams {
  search?: string
  status?: string
  category?: string
  difficulty?: string
  dateFrom?: string
  dateTo?: string
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
