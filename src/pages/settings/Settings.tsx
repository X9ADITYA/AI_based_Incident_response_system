import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2, Key, Shield, CreditCard, Bell, Palette, Users,
  Copy, RefreshCw, Plus, Trash2, Check, Eye, EyeOff, ChevronRight,
} from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuthStore } from '@/store/authStore'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

const MOCK_API_KEYS = [
  { id: 'key-001', name: 'Production API Key', key: 'demo_prod_key_001', created: '2024-01-01', lastUsed: '2024-01-22', status: 'active' },
  { id: 'key-002', name: 'Staging API Key',    key: 'demo_stage_key_002', created: '2024-01-10', lastUsed: '2024-01-20', status: 'active' },
  { id: 'key-003', name: 'Legacy Integration', key: 'demo_legacy_key_003', created: '2023-06-15', lastUsed: '2023-12-01', status: 'inactive' },
]

const MOCK_ROLES = [
  { id: 'role-001', name: 'Admin',   description: 'Full access to all features',          users: 2,  color: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' },
  { id: 'role-002', name: 'Manager', description: 'Manage assessments and candidates',     users: 8,  color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400' },
  { id: 'role-003', name: 'Viewer',  description: 'Read-only access to reports',           users: 15, color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
  { id: 'role-004', name: 'Recruiter','description': 'Invite and manage candidates',        users: 12, color: 'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400' },
]

export default function Settings() {
  const user = useAuthStore((s) => s.user)
  const [showKey, setShowKey] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [orgName, setOrgName] = useState('SkillMatrix Pro')
  const [notifications, setNotifications] = useState({ email: true, slack: false, weekly: true, instant: true })

  const copyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
    toast({ title: 'Copied!', description: 'API key copied to clipboard.' })
  }

  const maskKey = (key: string) => key.slice(0, 12) + '••••••••••••••••' + key.slice(-4)

  return (
    <div className="p-6 space-y-5 max-w-[1200px] mx-auto">
      <PageHeader title="Settings" description="Manage your organization, integrations, and preferences." />

      <Tabs defaultValue="organization">
        <TabsList className="h-10">
          <TabsTrigger value="organization" className="gap-1.5"><Building2 className="h-3.5 w-3.5" />Organization</TabsTrigger>
          <TabsTrigger value="api-keys" className="gap-1.5"><Key className="h-3.5 w-3.5" />API Keys</TabsTrigger>
          <TabsTrigger value="roles" className="gap-1.5"><Shield className="h-3.5 w-3.5" />Roles</TabsTrigger>
          <TabsTrigger value="billing" className="gap-1.5"><CreditCard className="h-3.5 w-3.5" />Billing</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5"><Bell className="h-3.5 w-3.5" />Notifications</TabsTrigger>
        </TabsList>

        {/* ── Organization ── */}
        <TabsContent value="organization" className="mt-5 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Organization Profile</CardTitle>
              <CardDescription>Basic information about your organization.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 border border-border text-2xl font-bold text-primary">
                  {orgName.slice(0, 2).toUpperCase()}
                </div>
                <Button variant="outline" size="sm">Change Logo</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Organization Name</Label>
                  <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Industry</Label>
                  <Select defaultValue="technology">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['Technology', 'Finance', 'Healthcare', 'Education', 'Retail', 'Manufacturing'].map((i) => (
                        <SelectItem key={i} value={i.toLowerCase()}>{i}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Company Size</Label>
                  <Select defaultValue="51-200">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['1-10', '11-50', '51-200', '201-500', '500+'].map((s) => (
                        <SelectItem key={s} value={s}>{s} employees</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Time Zone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['UTC', 'US/Eastern', 'US/Pacific', 'Europe/London', 'Asia/Kolkata'].map((tz) => (
                        <SelectItem key={tz} value={tz.toLowerCase()}>{tz}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="pt-2">
                <Button onClick={() => toast({ title: 'Saved!', description: 'Organization profile updated.', variant: 'default' })}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions. Proceed with caution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Delete all candidate data', desc: 'Permanently remove all candidate records.', btn: 'Delete Data' },
                { label: 'Delete organization', desc: 'This will permanently delete your account and all data.', btn: 'Delete Organization' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Button variant="destructive" size="sm">{item.btn}</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── API Keys ── */}
        <TabsContent value="api-keys" className="mt-5 space-y-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">API Keys</CardTitle>
                <CardDescription>Manage keys for integrating SkillMatrix Pro with your systems.</CardDescription>
              </div>
              <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Generate Key</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MOCK_API_KEYS.map((k) => (
                  <div key={k.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
                    <Key className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{k.name}</p>
                        <Badge variant={k.status === 'active' ? 'success' : 'gray'} className="text-[10px]">{k.status}</Badge>
                      </div>
                      <code className="text-xs text-muted-foreground font-mono">
                        {showKey === k.id ? k.key : maskKey(k.key)}
                      </code>
                      <p className="text-[10px] text-muted-foreground">Last used {k.lastUsed}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => setShowKey(showKey === k.id ? null : k.id)}>
                        {showKey === k.id ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => copyKey(k.key, k.id)}>
                        {copiedKey === k.id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                      <Button variant="ghost" size="icon-sm"><RefreshCw className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Webhook Configuration</CardTitle>
              <CardDescription>Send real-time events to your endpoint.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Webhook URL</Label>
                <Input placeholder="https://your-server.com/webhooks/skillmatrix" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Events to send</Label>
                {['candidate.assessment_completed', 'candidate.invited', 'assessment.published', 'report.generated'].map((e) => (
                  <div key={e} className="flex items-center gap-2">
                    <Switch defaultChecked={e.includes('completed')} />
                    <code className="text-xs text-muted-foreground">{e}</code>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm">Test Webhook</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Roles ── */}
        <TabsContent value="roles" className="mt-5 space-y-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Role Management</CardTitle>
                <CardDescription>Define access levels for your team members.</CardDescription>
              </div>
              <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Create Role</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_ROLES.map((role) => (
                <div key={role.id} className="flex items-center gap-4 rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors">
                  <div className={cn('rounded-lg px-2.5 py-1 text-xs font-semibold', role.color)}>{role.name}</div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users className="h-3.5 w-3.5" /> {role.users} users
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
                      Manage <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Billing ── */}
        <TabsContent value="billing" className="mt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { plan: 'Enterprise', price: '$299', period: '/mo', color: 'from-indigo-600 to-violet-600', features: ['Unlimited assessments', '10,000 candidates/mo', 'Advanced analytics', 'Priority support', 'SSO & SAML', 'Custom branding'] },
            ].map((p) => (
              <Card key={p.plan} className={`md:col-span-2 relative overflow-hidden bg-gradient-to-br ${p.color} text-white border-0`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="bg-white/20 text-white border-white/30 mb-3">Current Plan</Badge>
                      <h3 className="text-xl font-bold">{p.plan} Plan</h3>
                      <p className="text-3xl font-bold mt-1">{p.price}<span className="text-base font-normal opacity-80">{p.period}</span></p>
                    </div>
                    <div className="text-right text-sm opacity-80">
                      <p>Next billing</p>
                      <p className="font-semibold">Feb 1, 2024</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-1.5">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-1.5 text-xs text-white/80">
                        <Check className="h-3 w-3 text-white" /> {f}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <Button variant="secondary" size="sm">Manage Plan</Button>
                    <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">View Invoice</Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader><CardTitle className="text-base">Usage This Month</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Assessments', used: 20, limit: 'Unlimited' },
                  { label: 'Candidates', used: 3847, limit: 10000 },
                  { label: 'Storage', used: 12.4, limit: 50, unit: ' GB' },
                  { label: 'API Calls', used: 128400, limit: 500000 },
                ].map((u) => (
                  <div key={u.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{u.label}</span>
                      <span className="text-muted-foreground">
                        {u.used.toLocaleString()}{u.unit ?? ''} / {typeof u.limit === 'number' ? u.limit.toLocaleString() : u.limit}{u.unit ?? ''}
                      </span>
                    </div>
                    {typeof u.limit === 'number' && (
                      <div className="h-1.5 rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min((u.used / u.limit) * 100, 100)}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Notifications ── */}
        <TabsContent value="notifications" className="mt-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you receive alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {[
                { key: 'email',   label: 'Email notifications',          desc: 'Receive summaries and alerts via email' },
                { key: 'slack',   label: 'Slack integration',            desc: 'Post notifications to a Slack channel' },
                { key: 'weekly',  label: 'Weekly digest',                desc: 'Weekly summary of assessment activity' },
                { key: 'instant', label: 'Instant assessment alerts',    desc: 'Notify when a candidate completes an assessment' },
              ].map(({ key, label, desc }, i) => (
                <div key={key}>
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <Switch
                      checked={notifications[key as keyof typeof notifications]}
                      onCheckedChange={(v) => setNotifications((p) => ({ ...p, [key]: v }))}
                    />
                  </div>
                  {i < 3 && <Separator />}
                </div>
              ))}
              <div className="pt-4">
                <Button onClick={() => toast({ title: 'Preferences saved', description: 'Your notification settings have been updated.' })}>
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
