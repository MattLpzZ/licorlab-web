import type { Bundle } from '@/types'
import bundlesData from '@/lib/mock/bundles.json'

const all = bundlesData as Bundle[]

export async function getBundles(): Promise<Bundle[]> {
  return all
}
