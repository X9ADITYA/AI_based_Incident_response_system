import { motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, XCircle, Clock, Activity, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { APP_NAME } from '@/lib/constants'

const SERVICES = [
  { name: 'Assessment Engine',   status: 'operational', uptime: '99.98%', latency: '142ms', description: 'Core assessment delivery and evaluation' },
  { name: 'Proctoring Service',  status: 'operational', uptime: '99.91%', latency: '89ms',  description: 'AI-powered video and audio monitoring' },
  { name: 'Report Generation',   status: 'degraded',    uptime: '98.70%', latency: '1240ms', description: 'PDF and analytics report generation' },
  { name: 'Email Delivery',      status: 'operational', uptime: '99.95%', latency: '215ms', description: 'Candidate invitation and notification emails' },
  { name: 'Video Recording',     status: 'operational', uptime: '99.87%', latency: '310ms', description: 'Session recording and playback' },
  { name: 'API Gateway',         status: 'operational', uptime: '99.99%', latency: '34ms',  description: 'REST API and webhook endpoint' },
  { name: 'Candidate Portal',    status: 'operational', uptime: '99.94%', latency: '186ms', description: 'Candidate-facing assessment interface' },
  { name: 'Analytics Engine',    status: 'operational', uptime: '99.89%', latency: '423ms', description: 'Data processing and analytics' },
]

const INCIDENTS = [
  { id: 'inc-001', title: 'Report Generation Elevated Latency', status: 'investigating', time: '2024-01-22 10:15 UTC', description: 'We are investigating elevated latency in the report generation service. Assessment delivery is not affected.' },
  { id: 'inc-002', title: 'Email Delivery Partial Disruption (Resolved)', status: 'resolved', time: '2024-01-19 14:30 UTC', description: 'A subset of invitation emails experienced delivery delays of up to 30 minutes. The issue was resolved within 45 minutes.' },
]

const STATUS_CONFIG = {
  operational: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30', label: 'Operational', badge: 'success' as const },
  degraded:    { icon: AlertTriangle, color: 'text-amber-500',  bg: 'bg-amber-50 dark:bg-amber-950/30',   label: 'Degraded',    badge: 'warning' as const },
  outage:      { icon: XCircle,       color: 'text-red-500',    bg: 'bg-red-50 dark:bg-red-950/30',       label: 'Outage',      badge: 'danger' as const },
}

export default function Status() {
  const allOk = SERVICES.every((s) => s.status === 'operational')
  const degradedCount = SERVICES.filter((s) => s.status === 'degraded').length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-xl font-bold">{APP_NAME} — Status</h1>
            <p className="text-sm text-muted-foreground">Real-time system status and incident history</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Overall status */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'rounded-xl p-6 flex items-center gap-4',
            allOk ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50' :
            'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50'
          )}
        >
          {allOk
            ? <CheckCircle2 className="h-8 w-8 text-emerald-500 shrink-0" />
            : <AlertTriangle className="h-8 w-8 text-amber-500 shrink-0" />
          }
          <div>
            <h2 className="text-lg font-bold">
              {allOk ? 'All Systems Operational' : `${degradedCount} Service${degradedCount > 1 ? 's' : ''} Degraded`}
            </h2>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toUTCString()}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-sm text-muted-foreground">
            <Activity className="h-4 w-4" />
            <span>Live</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </motion.div>

        {/* Service status grid */}
        <div>
          <h3 className="text-base font-semibold mb-3">Services</h3>
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              {SERVICES.map((service, i) => {
                const config = STATUS_CONFIG[service.status as keyof typeof STATUS_CONFIG]
                const Icon = config.icon
                return (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', config.bg)}>
                      <Icon className={cn('h-4 w-4', config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.description}</p>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                      <span className="hidden sm:flex items-center gap-1"><Clock className="h-3 w-3" />{service.latency}</span>
                      <span className="hidden md:block">{service.uptime} uptime</span>
                      <Badge variant={config.badge}>{config.label}</Badge>
                    </div>
                  </motion.div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Incidents */}
        <div>
          <h3 className="text-base font-semibold mb-3">Recent Incidents</h3>
          <div className="space-y-3">
            {INCIDENTS.map((inc, i) => (
              <motion.div
                key={inc.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">{inc.title}</p>
                        <p className="text-xs text-muted-foreground">{inc.time}</p>
                        <p className="text-sm text-muted-foreground mt-2">{inc.description}</p>
                      </div>
                      <Badge variant={inc.status === 'resolved' ? 'success' : 'warning'} className="shrink-0 capitalize">
                        {inc.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Uptime history */}
        <div>
          <h3 className="text-base font-semibold mb-3">90-Day Uptime</h3>
          <Card>
            <CardContent className="p-5 space-y-4">
              {SERVICES.slice(0, 4).map((service) => (
                <div key={service.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-muted-foreground">{service.uptime}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 90 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn('h-4 flex-1 rounded-sm',
                          i === 82 && service.status === 'degraded' ? 'bg-amber-400' :
                          i === 31 ? 'bg-amber-300' : 'bg-emerald-400'
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
