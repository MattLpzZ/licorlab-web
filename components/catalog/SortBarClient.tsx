'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import SortBar from './SortBar'

interface SortBarClientProps {
  total: number
}

export default function SortBarClient({ total }: SortBarClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const sort = searchParams.get('sort') ?? ''

  function handleSortChange(newSort: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (newSort) {
      params.set('sort', newSort)
    } else {
      params.delete('sort')
    }
    params.delete('page')
    const qs = params.toString()
    router.push(`/catalog${qs ? `?${qs}` : ''}`)
  }

  return <SortBar total={total} sort={sort} onSortChange={handleSortChange} />
}
