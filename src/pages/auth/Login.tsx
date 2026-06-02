import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Shield, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { APP_NAME, APP_TAGLINE, MOCK_CREDENTIALS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const FEATURES = [
  'AI-powered skill assessment engine',
  'Real-time proctoring & anti-cheat',
  'Advanced analytics & reporting',
  '500+ assessment templates',
]

export default function Login() {
  const [email, setEmail] = useState(MOCK_CREDENTIALS.email)
  const [password, setPassword] = useState(MOCK_CREDENTIALS.password)
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const { login, isLoading, error, clearError } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    await login(email, password)
    if (useAuthStore.getState().user) navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — Branding */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 xl:w-[55%] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-12 flex-col justify-between relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-2xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-500/30">
              <Shield className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{APP_NAME}</p>
              <p className="text-xs text-indigo-300">{APP_TAGLINE}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white leading-tight">
                Hire the best talent<br />with confidence.
              </h1>
              <p className="mt-4 text-lg text-indigo-200/70 leading-relaxed">
                Assess technical skills, cultural fit, and cognitive ability — all in one enterprise-grade platform trusted by 2,400+ companies.
              </p>
            </div>

            <ul className="space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-indigo-100/80">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
          <p className="text-sm text-white/80 italic leading-relaxed">
            "SkillMatrix Pro reduced our time-to-hire by 40% and dramatically improved the quality of our technical hires."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-indigo-500/30 flex items-center justify-center text-xs font-bold text-white">JR</div>
            <div>
              <p className="text-xs font-semibold text-white">Jamie Reynolds</p>
              <p className="text-[10px] text-white/50">VP Engineering, Nexus Technologies</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right panel — Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex w-full lg:w-1/2 xl:w-[45%] items-center justify-center p-8"
      >
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <p className="text-lg font-bold">{APP_NAME}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">Sign in to your account to continue</p>
          </div>

          {/* Demo hint */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/30 px-4 py-3">
            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">Demo credentials are pre-filled. Just click Sign In.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="h-4 w-4" />}
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
              </div>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="h-4 w-4" />}
                rightIcon={
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
                placeholder="Your password"
                required
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive"
              >
                {error}
              </motion.p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch id="remember" checked={remember} onCheckedChange={setRemember} />
                <Label htmlFor="remember" className="cursor-pointer text-sm font-normal text-muted-foreground">Remember me</Label>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 text-base gap-2" loading={isLoading} size="lg">
              Sign In <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Don't have an account?{' '}
            <a href="#" className="text-primary font-medium hover:underline">Contact Sales</a>
          </p>

          <p className="text-center text-[10px] text-muted-foreground/60">
            Protected by enterprise-grade security · SOC 2 Type II · GDPR compliant
          </p>
        </div>
      </motion.div>
    </div>
  )
}
