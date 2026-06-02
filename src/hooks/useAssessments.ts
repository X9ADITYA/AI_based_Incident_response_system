import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchAssessments, createAssessment, updateAssessment, deleteAssessment } from '@/api/assessments'
import type { FilterParams, Assessment } from '@/types'

export function useAssessments(params: FilterParams = {}) {
  return useQuery({
    queryKey: ['assessments', params],
    queryFn: () => fetchAssessments(params),
    staleTime: 1000 * 30,
  })
}

export function useCreateAssessment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Assessment>) => createAssessment(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['assessments'] }),
  })
}

export function useUpdateAssessment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Assessment> }) => updateAssessment(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['assessments'] }),
  })
}

export function useDeleteAssessment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteAssessment(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['assessments'] }),
  })
}
