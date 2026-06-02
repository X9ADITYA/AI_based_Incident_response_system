import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchCandidates, fetchCandidateById, inviteCandidate } from '@/api/candidates'
import type { FilterParams } from '@/types'

export function useCandidates(params: FilterParams = {}) {
  return useQuery({
    queryKey: ['candidates', params],
    queryFn: () => fetchCandidates(params),
    staleTime: 1000 * 30,
  })
}

export function useCandidate(id: string) {
  return useQuery({
    queryKey: ['candidate', id],
    queryFn: () => fetchCandidateById(id),
    enabled: !!id,
  })
}

export function useInviteCandidate() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: inviteCandidate,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['candidates'] }),
  })
}
