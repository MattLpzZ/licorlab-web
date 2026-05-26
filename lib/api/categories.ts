import type { Category } from '@/types'
import categoriesData from '@/lib/mock/categories.json'

const all = categoriesData as Category[]

export async function getCategories(): Promise<Category[]> {
  return all
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return all.find(c => c.slug === slug) ?? null
}
