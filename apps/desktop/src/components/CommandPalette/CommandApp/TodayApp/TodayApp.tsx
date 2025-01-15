import { IPage } from '@/common/types'
import LoadingDots from '@/components/icons/loading-dots'
import { Box } from '@fower/react'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useSession } from '@penx/session'
import { api } from '@penx/trpc-client'
import { useDate } from './hooks/useDate'
import { Page } from './Page/Page'

export function TodayApp() {
  const { date } = useDate()
  const { data: session } = useSession()
  const { data, isLoading, isPending, isFetching } = useQuery({
    queryKey: ['journal', date],
    queryFn: async () => {
      const page = await api.page.getPage.query({
        siteId: session?.siteId,
        date: format(date, 'yyyy-MM-dd'),
      })

      return page as IPage
    },
    enabled: !!session?.siteId && !!date,
  })

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center pt-20 ">
        <LoadingDots className="bg-foreground/50"></LoadingDots>
      </div>
    )
  }

  return <Page page={data} />
}
