import { IExtensionItem } from '@/common/types'
import { trpc } from '@penx/trpc-client'

export function useExtensions() {
  const { data = [], isLoading } = trpc.extension.all.useQuery()
  return {
    extensions: data as IExtensionItem[],
    isLoading,
  }
}
