import { useState } from 'react'
import { PlusCircle, Tag } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { useCreateAssessment } from '@/hooks/useAssessments'
import { toast } from '@/hooks/use-toast'
import type { AssessmentCategory, AssessmentDifficulty } from '@/types'

interface Props { open: boolean; onClose: () => void }

const CATEGORIES: AssessmentCategory[] = ['Frontend Development','Backend Development','Full Stack','DevOps & Cloud','Data Science','Mobile Development','Cybersecurity','Database','Soft Skills','Project Management']
const DIFFICULTIES: AssessmentDifficulty[] = ['Beginner','Intermediate','Advanced','Expert']

export function CreateAssessmentModal({ open, onClose }: Props) {
  const create = useCreateAssessment()
  const [form, setForm] = useState({
    title: '', category: '' as AssessmentCategory,
    difficulty: '' as AssessmentDifficulty,
    duration: 60, questions: 30, passingScore: 65,
    isPublic: true, proctored: false, tagInput: '', tags: [] as string[],
  })

  const set = (k: keyof typeof form, v: unknown) => setForm((p) => ({ ...p, [k]: v }))

  const addTag = () => {
    const t = form.tagInput.trim()
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t])
    set('tagInput', '')
  }

  const handleSubmit = async () => {
    if (!form.title || !form.category || !form.difficulty) {
      toast({ title: 'Missing fields', description: 'Please fill in all required fields.', variant: 'destructive' })
      return
    }
    await create.mutateAsync({
      title: form.title, category: form.category, difficulty: form.difficulty,
      duration: form.duration, questions: form.questions, passingScore: form.passingScore,
      isPublic: form.isPublic, proctored: form.proctored, tags: form.tags,
    })
    toast({ title: 'Assessment created', description: `"${form.title}" has been saved as a draft.`, variant: 'default' })
    onClose()
    setForm({ title:'',category:'' as AssessmentCategory,difficulty:'' as AssessmentDifficulty,duration:60,questions:30,passingScore:65,isPublic:true,proctored:false,tagInput:'',tags:[] })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" /> Create Assessment
          </DialogTitle>
          <DialogDescription>Configure your new assessment. It will be saved as a draft.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
            <Input id="title" placeholder="e.g. Senior React Developer Assessment" value={form.title} onChange={(e) => set('title', e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Category <span className="text-destructive">*</span></Label>
              <Select value={form.category} onValueChange={(v) => set('category', v)}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Difficulty <span className="text-destructive">*</span></Label>
              <Select value={form.difficulty} onValueChange={(v) => set('difficulty', v)}>
                <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                <SelectContent>{DIFFICULTIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="duration">Duration (min)</Label>
              <Input id="duration" type="number" min={10} max={300} value={form.duration} onChange={(e) => set('duration', +e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="questions">Questions</Label>
              <Input id="questions" type="number" min={5} max={200} value={form.questions} onChange={(e) => set('questions', +e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="passing">Passing Score (%)</Label>
              <Input id="passing" type="number" min={1} max={100} value={form.passingScore} onChange={(e) => set('passingScore', +e.target.value)} />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag and press Enter"
                value={form.tagInput}
                onChange={(e) => set('tagInput', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                leftIcon={<Tag className="h-3.5 w-3.5" />}
              />
              <Button type="button" variant="outline" size="sm" onClick={addTag}>Add</Button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="gap-1 cursor-pointer hover:bg-destructive/10" onClick={() => set('tags', form.tags.filter((x) => x !== t))}>
                    {t} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Switch id="public" checked={form.isPublic} onCheckedChange={(v) => set('isPublic', v)} />
              <Label htmlFor="public" className="cursor-pointer">Public assessment</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="proctored" checked={form.proctored} onCheckedChange={(v) => set('proctored', v)} />
              <Label htmlFor="proctored" className="cursor-pointer">Enable proctoring</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} loading={create.isPending}>
            Create Assessment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
