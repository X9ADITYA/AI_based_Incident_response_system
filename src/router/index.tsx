import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { PageLoader } from '@/components/common/LoadingSpinner'

// Route-based code splitting
const Login      = lazy(() => import('@/pages/auth/Login'))
const Dashboard  = lazy(() => import('@/pages/dashboard/Dashboard'))
const Assessments = lazy(() => import('@/pages/assessments/Assessments'))
const Candidates = lazy(() => import('@/pages/candidates/Candidates'))
const Analytics  = lazy(() => import('@/pages/analytics/Analytics'))
const Settings   = lazy(() => import('@/pages/settings/Settings'))
const Status     = lazy(() => import('@/pages/status/Status'))

function Fallback() {
  return <PageLoader label="Loading page..." />
}

function wrap(element: JSX.Element) {
  return <Suspense fallback={<Fallback />}>{element}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: wrap(<Login />) },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      { path: '/dashboard',   element: wrap(<Dashboard />) },
      { path: '/assessments', element: wrap(<Assessments />) },
      { path: '/candidates',  element: wrap(<Candidates />) },
      { path: '/analytics',   element: wrap(<Analytics />) },
      { path: '/settings',    element: wrap(<Settings />) },
      { path: '/status',      element: wrap(<Status />) },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
])
