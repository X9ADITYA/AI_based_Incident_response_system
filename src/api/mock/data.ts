import type { Assessment, Candidate, DashboardData, AnalyticsData, Notification } from '@/types'

// ─── Assessments ──────────────────────────────────────────────────────────────
export const mockAssessments: Assessment[] = [
  { id: 'asmt-001', title: 'Senior React Developer Assessment', category: 'Frontend Development', difficulty: 'Advanced', duration: 90, questions: 45, status: 'active', candidates: 234, completionRate: 78, avgScore: 72, passingScore: 65, tags: ['React', 'TypeScript', 'Redux'], createdAt: '2024-01-15', updatedAt: '2024-01-28', createdBy: 'Alex Morgan', isPublic: true, proctored: true },
  { id: 'asmt-002', title: 'Python Data Engineering', category: 'Data Science', difficulty: 'Intermediate', duration: 60, questions: 30, status: 'active', candidates: 189, completionRate: 82, avgScore: 68, passingScore: 60, tags: ['Python', 'Pandas', 'SQL', 'Spark'], createdAt: '2024-01-10', updatedAt: '2024-01-25', createdBy: 'Sarah Chen', isPublic: true, proctored: false },
  { id: 'asmt-003', title: 'AWS Cloud Architecture', category: 'DevOps & Cloud', difficulty: 'Expert', duration: 120, questions: 60, status: 'active', candidates: 156, completionRate: 65, avgScore: 61, passingScore: 70, tags: ['AWS', 'Cloud', 'Architecture', 'IaC'], createdAt: '2024-01-08', updatedAt: '2024-01-22', createdBy: 'Mike Johnson', isPublic: false, proctored: true },
  { id: 'asmt-004', title: 'Node.js Backend Development', category: 'Backend Development', difficulty: 'Intermediate', duration: 75, questions: 35, status: 'active', candidates: 312, completionRate: 88, avgScore: 74, passingScore: 65, tags: ['Node.js', 'Express', 'MongoDB', 'REST'], createdAt: '2024-01-05', updatedAt: '2024-01-20', createdBy: 'Alex Morgan', isPublic: true, proctored: false },
  { id: 'asmt-005', title: 'Kubernetes & Container Orchestration', category: 'DevOps & Cloud', difficulty: 'Advanced', duration: 90, questions: 40, status: 'draft', candidates: 0, completionRate: 0, avgScore: 0, passingScore: 68, tags: ['Kubernetes', 'Docker', 'DevOps', 'Helm'], createdAt: '2024-01-20', updatedAt: '2024-01-21', createdBy: 'Sarah Chen', isPublic: false, proctored: false },
  { id: 'asmt-006', title: 'Full Stack JavaScript Assessment', category: 'Full Stack', difficulty: 'Intermediate', duration: 105, questions: 50, status: 'active', candidates: 445, completionRate: 71, avgScore: 69, passingScore: 60, tags: ['JavaScript', 'React', 'Node.js', 'PostgreSQL'], createdAt: '2023-12-15', updatedAt: '2024-01-18', createdBy: 'Mike Johnson', isPublic: true, proctored: true },
  { id: 'asmt-007', title: 'iOS Swift Developer', category: 'Mobile Development', difficulty: 'Advanced', duration: 80, questions: 38, status: 'active', candidates: 98, completionRate: 74, avgScore: 71, passingScore: 65, tags: ['Swift', 'iOS', 'UIKit', 'SwiftUI'], createdAt: '2023-12-10', updatedAt: '2024-01-15', createdBy: 'Lisa Park', isPublic: true, proctored: false },
  { id: 'asmt-008', title: 'SQL & Database Design', category: 'Database', difficulty: 'Intermediate', duration: 60, questions: 28, status: 'active', candidates: 367, completionRate: 85, avgScore: 76, passingScore: 65, tags: ['SQL', 'PostgreSQL', 'MySQL', 'Database Design'], createdAt: '2023-12-05', updatedAt: '2024-01-10', createdBy: 'Alex Morgan', isPublic: true, proctored: false },
  { id: 'asmt-009', title: 'Cybersecurity Fundamentals', category: 'Cybersecurity', difficulty: 'Beginner', duration: 45, questions: 25, status: 'archived', candidates: 521, completionRate: 91, avgScore: 79, passingScore: 70, tags: ['Security', 'Networking', 'Cryptography'], createdAt: '2023-11-20', updatedAt: '2024-01-05', createdBy: 'Mike Johnson', isPublic: true, proctored: false },
  { id: 'asmt-010', title: 'Machine Learning Engineering', category: 'Data Science', difficulty: 'Expert', duration: 150, questions: 65, status: 'active', candidates: 143, completionRate: 58, avgScore: 64, passingScore: 72, tags: ['ML', 'TensorFlow', 'PyTorch', 'Python'], createdAt: '2023-11-15', updatedAt: '2024-01-12', createdBy: 'Sarah Chen', isPublic: false, proctored: true },
  { id: 'asmt-011', title: 'Leadership & Management Skills', category: 'Soft Skills', difficulty: 'Intermediate', duration: 50, questions: 30, status: 'active', candidates: 289, completionRate: 93, avgScore: 81, passingScore: 70, tags: ['Leadership', 'Communication', 'Management'], createdAt: '2023-11-10', updatedAt: '2024-01-08', createdBy: 'Lisa Park', isPublic: true, proctored: false },
  { id: 'asmt-012', title: 'Vue.js Frontend Development', category: 'Frontend Development', difficulty: 'Intermediate', duration: 70, questions: 32, status: 'scheduled', candidates: 0, completionRate: 0, avgScore: 0, passingScore: 60, tags: ['Vue.js', 'JavaScript', 'CSS'], createdAt: '2024-01-22', updatedAt: '2024-01-22', createdBy: 'Alex Morgan', isPublic: true, proctored: false },
  { id: 'asmt-013', title: 'GraphQL API Design', category: 'Backend Development', difficulty: 'Advanced', duration: 85, questions: 40, status: 'active', candidates: 127, completionRate: 76, avgScore: 70, passingScore: 65, tags: ['GraphQL', 'API', 'Node.js', 'Schema'], createdAt: '2023-11-01', updatedAt: '2024-01-06', createdBy: 'Mike Johnson', isPublic: true, proctored: false },
  { id: 'asmt-014', title: 'Android Kotlin Development', category: 'Mobile Development', difficulty: 'Advanced', duration: 80, questions: 38, status: 'active', candidates: 87, completionRate: 72, avgScore: 68, passingScore: 63, tags: ['Kotlin', 'Android', 'Jetpack', 'Compose'], createdAt: '2023-10-25', updatedAt: '2024-01-04', createdBy: 'Lisa Park', isPublic: true, proctored: false },
  { id: 'asmt-015', title: 'Agile & Scrum Certification', category: 'Project Management', difficulty: 'Beginner', duration: 40, questions: 20, status: 'active', candidates: 678, completionRate: 95, avgScore: 83, passingScore: 70, tags: ['Agile', 'Scrum', 'Kanban', 'JIRA'], createdAt: '2023-10-15', updatedAt: '2023-12-28', createdBy: 'Lisa Park', isPublic: true, proctored: false },
  { id: 'asmt-016', title: 'React Native Mobile Dev', category: 'Mobile Development', difficulty: 'Advanced', duration: 90, questions: 42, status: 'active', candidates: 112, completionRate: 69, avgScore: 67, passingScore: 62, tags: ['React Native', 'JavaScript', 'Mobile', 'Expo'], createdAt: '2023-10-10', updatedAt: '2023-12-20', createdBy: 'Alex Morgan', isPublic: true, proctored: true },
  { id: 'asmt-017', title: 'DevSecOps Practices', category: 'DevOps & Cloud', difficulty: 'Advanced', duration: 100, questions: 48, status: 'active', candidates: 134, completionRate: 67, avgScore: 65, passingScore: 68, tags: ['DevSecOps', 'CI/CD', 'Security', 'Jenkins'], createdAt: '2023-09-20', updatedAt: '2023-12-15', createdBy: 'Mike Johnson', isPublic: false, proctored: true },
  { id: 'asmt-018', title: 'Java Spring Boot Backend', category: 'Backend Development', difficulty: 'Intermediate', duration: 75, questions: 35, status: 'archived', candidates: 423, completionRate: 84, avgScore: 73, passingScore: 65, tags: ['Java', 'Spring Boot', 'Microservices', 'REST'], createdAt: '2023-09-01', updatedAt: '2023-12-01', createdBy: 'Sarah Chen', isPublic: true, proctored: false },
  { id: 'asmt-019', title: 'UX/UI Design Principles', category: 'Frontend Development', difficulty: 'Beginner', duration: 55, questions: 28, status: 'active', candidates: 256, completionRate: 89, avgScore: 77, passingScore: 65, tags: ['UX', 'UI', 'Figma', 'Design Systems'], createdAt: '2023-08-15', updatedAt: '2023-12-10', createdBy: 'Lisa Park', isPublic: true, proctored: false },
  { id: 'asmt-020', title: 'Blockchain & Web3 Development', category: 'Backend Development', difficulty: 'Expert', duration: 130, questions: 55, status: 'draft', candidates: 0, completionRate: 0, avgScore: 0, passingScore: 70, tags: ['Blockchain', 'Solidity', 'Ethereum', 'Web3'], createdAt: '2024-01-24', updatedAt: '2024-01-24', createdBy: 'Mike Johnson', isPublic: false, proctored: true },
]

// ─── Candidates ───────────────────────────────────────────────────────────────
export const mockCandidates: Candidate[] = [
  { id: 'cand-001', name: 'Sarah Johnson', email: 'sarah.j@techcorp.com', avatar: null, phone: '+1 (415) 234-5678', role: 'Senior Frontend Developer', company: 'TechCorp Inc.', location: 'San Francisco, CA', status: 'completed', assessmentsTaken: 3, avgScore: 87, skills: [{ name: 'React', score: 92, level: 'Expert', percentile: 95 }, { name: 'TypeScript', score: 85, level: 'Advanced', percentile: 88 }, { name: 'CSS/SCSS', score: 78, level: 'Advanced', percentile: 79 }, { name: 'Node.js', score: 71, level: 'Intermediate', percentile: 68 }, { name: 'Testing', score: 83, level: 'Advanced', percentile: 85 }], results: [{ assessmentId: 'asmt-001', assessmentTitle: 'Senior React Developer Assessment', score: 91, passingScore: 65, passed: true, completedAt: '2024-01-20', duration: 82, rank: 12, totalCandidates: 234 }], lastActivity: '2024-01-20', invitedAt: '2024-01-10', tags: ['Top Performer', 'React Expert'], linkedIn: 'linkedin.com/in/sarahjohnson', experience: 6 },
  { id: 'cand-002', name: 'Marcus Chen', email: 'marcus.c@innovate.io', avatar: null, phone: '+1 (628) 345-6789', role: 'Full Stack Engineer', company: 'Innovate.io', location: 'New York, NY', status: 'completed', assessmentsTaken: 2, avgScore: 76, skills: [{ name: 'JavaScript', score: 84, level: 'Advanced', percentile: 86 }, { name: 'Python', score: 79, level: 'Advanced', percentile: 80 }, { name: 'PostgreSQL', score: 74, level: 'Intermediate', percentile: 72 }, { name: 'Docker', score: 68, level: 'Intermediate', percentile: 64 }, { name: 'React', score: 77, level: 'Advanced', percentile: 76 }], results: [{ assessmentId: 'asmt-006', assessmentTitle: 'Full Stack JavaScript Assessment', score: 76, passingScore: 60, passed: true, completedAt: '2024-01-18', duration: 98, rank: 45, totalCandidates: 445 }], lastActivity: '2024-01-18', invitedAt: '2024-01-08', tags: ['Full Stack'], linkedIn: 'linkedin.com/in/marcuschen', experience: 4 },
  { id: 'cand-003', name: 'Priya Sharma', email: 'priya.s@datatech.co', avatar: null, phone: '+1 (510) 456-7890', role: 'Data Engineer', company: 'DataTech Solutions', location: 'Seattle, WA', status: 'in_progress', assessmentsTaken: 1, avgScore: 68, skills: [{ name: 'Python', score: 88, level: 'Expert', percentile: 91 }, { name: 'SQL', score: 85, level: 'Advanced', percentile: 87 }, { name: 'Spark', score: 72, level: 'Intermediate', percentile: 70 }, { name: 'Airflow', score: 65, level: 'Intermediate', percentile: 61 }, { name: 'Kafka', score: 58, level: 'Intermediate', percentile: 54 }], results: [], lastActivity: '2024-01-21', invitedAt: '2024-01-15', tags: ['Data', 'Python'], linkedIn: 'linkedin.com/in/priyasharma', experience: 3 },
  { id: 'cand-004', name: 'James O\'Brien', email: 'james.ob@cloudnative.dev', avatar: null, phone: '+1 (312) 567-8901', role: 'DevOps Engineer', company: 'CloudNative Dev', location: 'Chicago, IL', status: 'completed', assessmentsTaken: 4, avgScore: 81, skills: [{ name: 'Kubernetes', score: 89, level: 'Expert', percentile: 93 }, { name: 'AWS', score: 86, level: 'Advanced', percentile: 89 }, { name: 'Terraform', score: 83, level: 'Advanced', percentile: 85 }, { name: 'CI/CD', score: 79, level: 'Advanced', percentile: 80 }, { name: 'Linux', score: 91, level: 'Expert', percentile: 96 }], results: [{ assessmentId: 'asmt-003', assessmentTitle: 'AWS Cloud Architecture', score: 84, passingScore: 70, passed: true, completedAt: '2024-01-16', duration: 110, rank: 8, totalCandidates: 156 }], lastActivity: '2024-01-20', invitedAt: '2024-01-05', tags: ['Top Performer', 'Cloud Expert', 'DevOps'], linkedIn: 'linkedin.com/in/jamesobrien', experience: 7 },
  { id: 'cand-005', name: 'Aisha Williams', email: 'aisha.w@securetech.net', avatar: null, phone: '+1 (202) 678-9012', role: 'Security Engineer', company: 'SecureTech Networks', location: 'Washington, DC', status: 'invited', assessmentsTaken: 0, avgScore: 0, skills: [], results: [], lastActivity: '2024-01-22', invitedAt: '2024-01-22', tags: ['Security'], linkedIn: 'linkedin.com/in/aishawilliams', experience: 5 },
  { id: 'cand-006', name: 'Ethan Rodriguez', email: 'ethan.r@mobilefirst.app', avatar: null, phone: '+1 (213) 789-0123', role: 'iOS Developer', company: 'MobileFirst Apps', location: 'Los Angeles, CA', status: 'completed', assessmentsTaken: 2, avgScore: 73, skills: [{ name: 'Swift', score: 86, level: 'Advanced', percentile: 88 }, { name: 'SwiftUI', score: 79, level: 'Advanced', percentile: 80 }, { name: 'Objective-C', score: 65, level: 'Intermediate', percentile: 60 }, { name: 'UIKit', score: 82, level: 'Advanced', percentile: 83 }, { name: 'Core Data', score: 71, level: 'Intermediate', percentile: 69 }], results: [{ assessmentId: 'asmt-007', assessmentTitle: 'iOS Swift Developer', score: 86, passingScore: 65, passed: true, completedAt: '2024-01-14', duration: 74, rank: 6, totalCandidates: 98 }], lastActivity: '2024-01-14', invitedAt: '2024-01-04', tags: ['Mobile', 'iOS'], linkedIn: 'linkedin.com/in/ethanrodriguez', experience: 4 },
  { id: 'cand-007', name: 'Nadia Petrov', email: 'nadia.p@airesearch.org', avatar: null, phone: '+1 (617) 890-1234', role: 'ML Engineer', company: 'AI Research Lab', location: 'Boston, MA', status: 'completed', assessmentsTaken: 3, avgScore: 69, skills: [{ name: 'Python', score: 91, level: 'Expert', percentile: 94 }, { name: 'TensorFlow', score: 84, level: 'Advanced', percentile: 86 }, { name: 'PyTorch', score: 82, level: 'Advanced', percentile: 84 }, { name: 'Statistics', score: 88, level: 'Expert', percentile: 90 }, { name: 'MLOps', score: 71, level: 'Intermediate', percentile: 70 }], results: [{ assessmentId: 'asmt-010', assessmentTitle: 'Machine Learning Engineering', score: 78, passingScore: 72, passed: true, completedAt: '2024-01-12', duration: 138, rank: 3, totalCandidates: 143 }], lastActivity: '2024-01-12', invitedAt: '2024-01-02', tags: ['AI/ML', 'Top Performer'], linkedIn: 'linkedin.com/in/nadiapetrov', experience: 5 },
  { id: 'cand-008', name: 'Tyler Brooks', email: 'tyler.b@startupxyz.com', avatar: null, phone: '+1 (512) 901-2345', role: 'Backend Developer', company: 'StartupXYZ', location: 'Austin, TX', status: 'expired', assessmentsTaken: 1, avgScore: 0, skills: [], results: [], lastActivity: '2024-01-10', invitedAt: '2023-12-28', tags: [], linkedIn: null, experience: 2 },
  { id: 'cand-009', name: 'Mei Lin', email: 'mei.l@enterprise.corp', avatar: null, phone: '+1 (408) 012-3456', role: 'Database Administrator', company: 'Enterprise Corp', location: 'San Jose, CA', status: 'completed', assessmentsTaken: 2, avgScore: 84, skills: [{ name: 'PostgreSQL', score: 93, level: 'Expert', percentile: 96 }, { name: 'MySQL', score: 89, level: 'Expert', percentile: 91 }, { name: 'Oracle', score: 81, level: 'Advanced', percentile: 83 }, { name: 'MongoDB', score: 75, level: 'Advanced', percentile: 75 }, { name: 'Redis', score: 78, level: 'Advanced', percentile: 79 }], results: [{ assessmentId: 'asmt-008', assessmentTitle: 'SQL & Database Design', score: 93, passingScore: 65, passed: true, completedAt: '2024-01-09', duration: 54, rank: 2, totalCandidates: 367 }], lastActivity: '2024-01-09', invitedAt: '2023-12-30', tags: ['Database Expert', 'Top Performer'], linkedIn: 'linkedin.com/in/meilin', experience: 8 },
  { id: 'cand-010', name: 'Oliver Patel', email: 'oliver.p@techsolutions.uk', avatar: null, phone: '+44 20 1234 5678', role: 'DevOps Lead', company: 'TechSolutions UK', location: 'London, UK', status: 'in_progress', assessmentsTaken: 2, avgScore: 77, skills: [{ name: 'AWS', score: 83, level: 'Advanced', percentile: 85 }, { name: 'Kubernetes', score: 79, level: 'Advanced', percentile: 80 }, { name: 'Python', score: 72, level: 'Intermediate', percentile: 70 }, { name: 'Terraform', score: 80, level: 'Advanced', percentile: 81 }, { name: 'Ansible', score: 75, level: 'Advanced', percentile: 75 }], results: [], lastActivity: '2024-01-22', invitedAt: '2024-01-12', tags: ['Cloud', 'DevOps'], linkedIn: 'linkedin.com/in/oliverpatel', experience: 6 },
  { id: 'cand-011', name: 'Amanda Foster', email: 'amanda.f@digitalagency.com', avatar: null, phone: '+1 (303) 123-4567', role: 'UX Engineer', company: 'Digital Agency Co', location: 'Denver, CO', status: 'completed', assessmentsTaken: 1, avgScore: 79, skills: [{ name: 'Figma', score: 90, level: 'Expert', percentile: 92 }, { name: 'React', score: 75, level: 'Advanced', percentile: 75 }, { name: 'CSS', score: 88, level: 'Expert', percentile: 90 }, { name: 'UX Research', score: 82, level: 'Advanced', percentile: 84 }, { name: 'Design Systems', score: 85, level: 'Advanced', percentile: 87 }], results: [{ assessmentId: 'asmt-019', assessmentTitle: 'UX/UI Design Principles', score: 88, passingScore: 65, passed: true, completedAt: '2024-01-07', duration: 48, rank: 4, totalCandidates: 256 }], lastActivity: '2024-01-07', invitedAt: '2023-12-27', tags: ['Design', 'UX'], linkedIn: 'linkedin.com/in/amandafoster', experience: 4 },
  { id: 'cand-012', name: 'Kevin O\'Sullivan', email: 'kevin.os@fintech.ie', avatar: null, phone: '+353 1 234 5678', role: 'Backend Engineer', company: 'FinTech Ireland', location: 'Dublin, Ireland', status: 'disqualified', assessmentsTaken: 1, avgScore: 38, skills: [], results: [{ assessmentId: 'asmt-004', assessmentTitle: 'Node.js Backend Development', score: 38, passingScore: 65, passed: false, completedAt: '2024-01-06', duration: 71, rank: 298, totalCandidates: 312 }], lastActivity: '2024-01-06', invitedAt: '2023-12-26', tags: [], linkedIn: null, experience: 1 },
]

// ─── Dashboard ────────────────────────────────────────────────────────────────
export const mockDashboardData: DashboardData = {
  kpis: [
    { label: 'Total Assessments', value: 20, change: 12.5, changeType: 'increase', description: 'Active assessment library' },
    { label: 'Active Candidates', value: 3847, change: 8.3, changeType: 'increase', description: 'Candidates this month' },
    { label: 'Completion Rate', value: '78.4%', change: 3.2, changeType: 'increase', description: 'Avg across all assessments' },
    { label: 'Monthly Revenue', value: '$48,290', change: 15.7, changeType: 'increase', prefix: '$', description: 'Current billing period' },
  ],
  assessmentTrend: [
    { month: 'Aug', value: 312, secondary: 245 },
    { month: 'Sep', value: 389, secondary: 298 },
    { month: 'Oct', value: 445, secondary: 367 },
    { month: 'Nov', value: 521, secondary: 412 },
    { month: 'Dec', value: 498, secondary: 445 },
    { month: 'Jan', value: 634, secondary: 521 },
  ],
  completionTrend: [
    { month: 'Aug', value: 71.2 },
    { month: 'Sep', value: 73.8 },
    { month: 'Oct', value: 75.1 },
    { month: 'Nov', value: 76.9 },
    { month: 'Dec', value: 74.3 },
    { month: 'Jan', value: 78.4 },
  ],
  recentActivity: [
    { id: 'act-001', type: 'assessment_completed', actor: 'Sarah Johnson', target: 'Senior React Developer Assessment', timestamp: '2024-01-22T14:32:00Z', meta: { score: '91', passed: 'true' } },
    { id: 'act-002', type: 'candidate_invited', actor: 'Alex Morgan', target: 'Aisha Williams', timestamp: '2024-01-22T13:15:00Z', meta: { assessment: 'Cybersecurity Fundamentals' } },
    { id: 'act-003', type: 'assessment_created', actor: 'Mike Johnson', target: 'Blockchain & Web3 Development', timestamp: '2024-01-22T11:47:00Z', meta: {} },
    { id: 'act-004', type: 'candidate_passed', actor: 'James O\'Brien', target: 'AWS Cloud Architecture', timestamp: '2024-01-21T16:20:00Z', meta: { score: '84', rank: '8' } },
    { id: 'act-005', type: 'report_generated', actor: 'Sarah Chen', target: 'Q1 2024 Analytics Report', timestamp: '2024-01-21T10:05:00Z', meta: {} },
    { id: 'act-006', type: 'assessment_completed', actor: 'Mei Lin', target: 'SQL & Database Design', timestamp: '2024-01-20T17:42:00Z', meta: { score: '93', passed: 'true' } },
    { id: 'act-007', type: 'candidate_invited', actor: 'Lisa Park', target: 'Oliver Patel', timestamp: '2024-01-20T09:30:00Z', meta: { assessment: 'AWS Cloud Architecture' } },
    { id: 'act-008', type: 'assessment_completed', actor: 'Ethan Rodriguez', target: 'iOS Swift Developer', timestamp: '2024-01-19T15:18:00Z', meta: { score: '86', passed: 'true' } },
  ],
  systemStatus: [
    { service: 'Assessment Engine', status: 'operational', uptime: 99.98, latency: 142 },
    { service: 'Proctoring Service', status: 'operational', uptime: 99.91, latency: 89 },
    { service: 'Report Generation', status: 'degraded', uptime: 98.7, latency: 1240 },
    { service: 'Email Delivery', status: 'operational', uptime: 99.95, latency: 215 },
    { service: 'Video Recording', status: 'operational', uptime: 99.87, latency: 310 },
    { service: 'API Gateway', status: 'operational', uptime: 99.99, latency: 34 },
  ],
  skillDistribution: [
    { skill: 'JavaScript', count: 1243, avgScore: 74 },
    { skill: 'Python', count: 987, avgScore: 71 },
    { skill: 'React', count: 834, avgScore: 76 },
    { skill: 'SQL', count: 756, avgScore: 79 },
    { skill: 'AWS', count: 612, avgScore: 69 },
    { skill: 'TypeScript', count: 589, avgScore: 72 },
    { skill: 'Docker', count: 445, avgScore: 68 },
    { skill: 'Node.js', count: 423, avgScore: 73 },
  ],
}

// ─── Analytics ────────────────────────────────────────────────────────────────
export const mockAnalyticsData: AnalyticsData = {
  scoreDistribution: [
    { range: '0–20', count: 89, percentage: 2.3 },
    { range: '21–40', count: 213, percentage: 5.5 },
    { range: '41–60', count: 612, percentage: 15.9 },
    { range: '61–70', count: 934, percentage: 24.2 },
    { range: '71–80', count: 1087, percentage: 28.2 },
    { range: '81–90', count: 723, percentage: 18.7 },
    { range: '91–100', count: 200, percentage: 5.2 },
  ],
  categoryPerformance: [
    { category: 'Frontend Dev', avgScore: 74, candidates: 1247, passRate: 79 },
    { category: 'Backend Dev', avgScore: 71, candidates: 1089, passRate: 74 },
    { category: 'DevOps & Cloud', avgScore: 68, candidates: 678, passRate: 65 },
    { category: 'Data Science', avgScore: 69, candidates: 542, passRate: 67 },
    { category: 'Mobile Dev', avgScore: 72, candidates: 398, passRate: 75 },
    { category: 'Database', avgScore: 77, candidates: 456, passRate: 82 },
    { category: 'Cybersecurity', avgScore: 75, candidates: 312, passRate: 77 },
    { category: 'Soft Skills', avgScore: 81, candidates: 534, passRate: 88 },
  ],
  topSkills: [
    { skill: 'SQL', count: 756, avgScore: 79 },
    { skill: 'Soft Skills', count: 534, avgScore: 81 },
    { skill: 'React', count: 834, avgScore: 76 },
    { skill: 'JavaScript', count: 1243, avgScore: 74 },
    { skill: 'Node.js', count: 423, avgScore: 73 },
    { skill: 'TypeScript', count: 589, avgScore: 72 },
    { skill: 'Mobile Dev', count: 289, avgScore: 72 },
    { skill: 'Python', count: 987, avgScore: 71 },
  ],
  passRateTrend: [
    { month: 'Aug', value: 68.4 },
    { month: 'Sep', value: 70.2 },
    { month: 'Oct', value: 71.8 },
    { month: 'Nov', value: 73.5 },
    { month: 'Dec', value: 72.1 },
    { month: 'Jan', value: 75.3 },
  ],
  candidateGrowth: [
    { month: 'Aug', value: 2841, secondary: 2234 },
    { month: 'Sep', value: 3012, secondary: 2456 },
    { month: 'Oct', value: 3245, secondary: 2678 },
    { month: 'Nov', value: 3567, secondary: 2901 },
    { month: 'Dec', value: 3412, secondary: 2789 },
    { month: 'Jan', value: 3847, secondary: 3102 },
  ],
  assessmentCompletion: [
    { category: 'Frontend Development', completed: 2134, total: 2689, rate: 79.4 },
    { category: 'Backend Development', completed: 1876, total: 2445, rate: 76.7 },
    { category: 'DevOps & Cloud', completed: 1023, total: 1567, rate: 65.3 },
    { category: 'Data Science', completed: 867, total: 1234, rate: 70.3 },
    { category: 'Mobile Development', completed: 612, total: 812, rate: 75.4 },
    { category: 'Database', completed: 789, total: 923, rate: 85.5 },
    { category: 'Cybersecurity', completed: 423, total: 512, rate: 82.6 },
    { category: 'Soft Skills', completed: 1098, total: 1167, rate: 94.1 },
  ],
}

// ─── Notifications ────────────────────────────────────────────────────────────
export const mockNotifications: Notification[] = [
  { id: 'notif-001', type: 'success', title: 'Assessment Completed', message: 'Sarah Johnson scored 91% on Senior React Developer Assessment.', timestamp: '2024-01-22T14:32:00Z', read: false, actionLabel: 'View Result', actionUrl: '/candidates' },
  { id: 'notif-002', type: 'info', title: 'New Candidates Invited', message: '15 new candidates have been invited to the Node.js Backend Assessment.', timestamp: '2024-01-22T12:00:00Z', read: false, actionLabel: 'View Candidates', actionUrl: '/candidates' },
  { id: 'notif-003', type: 'warning', title: 'Report Generation Degraded', message: 'Our report generation service is experiencing elevated latency. We are investigating.', timestamp: '2024-01-22T10:15:00Z', read: false },
  { id: 'notif-004', type: 'success', title: 'Monthly Report Ready', message: 'Your January 2024 analytics report has been generated and is ready for download.', timestamp: '2024-01-21T09:00:00Z', read: true, actionLabel: 'Download Report', actionUrl: '/analytics' },
  { id: 'notif-005', type: 'info', title: 'Subscription Renewal', message: 'Your Enterprise Plan renews in 14 days. Ensure your billing info is up to date.', timestamp: '2024-01-20T08:00:00Z', read: true, actionLabel: 'Manage Billing', actionUrl: '/settings' },
  { id: 'notif-006', type: 'error', title: 'Failed Email Delivery', message: '3 candidate invitation emails failed to deliver. Please verify email addresses.', timestamp: '2024-01-19T16:45:00Z', read: true, actionLabel: 'View Details', actionUrl: '/candidates' },
  { id: 'notif-007', type: 'success', title: 'Assessment Published', message: '"Vue.js Frontend Development" has been published and is now accepting candidates.', timestamp: '2024-01-18T14:20:00Z', read: true },
  { id: 'notif-008', type: 'info', title: 'System Maintenance', message: 'Scheduled maintenance on Jan 28, 2024 from 2:00–4:00 AM UTC. Minimal disruption expected.', timestamp: '2024-01-17T10:00:00Z', read: true },
]
