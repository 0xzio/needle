'use client'

import { useEffect, useMemo, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { IPage } from '@/common/types'
import { PlateEditor } from '@/components/editor/plate-editor'
// import { PageData, updatePage, usePage } from '@/hooks/usePage'
import { appEmitter } from '@/lib/app-emitter'
import { pageToSlate } from '@/lib/serializer/pageToSlate'
import { format } from 'date-fns'
import { useDebouncedCallback } from 'use-debounce'
import { trpc } from '@penx/trpc-client'
import { useDate } from '../hooks/useDate'
import { JournalNav } from './JournalNav'

export function Page({ page }: { page: IPage }) {
  const [data, setData] = useState<IPage>(page!)
  const { mutateAsync } = trpc.page.update.useMutation()
  const { date } = useDate()

  // console.log('data======blocks:', data)

  const content = pageToSlate(data)

  const journalTitle = useMemo(() => {
    const formattedDate = format(date, 'LLL do')
    return formattedDate
  }, [date])

  const debounced = useDebouncedCallback(
    async (value: IPage) => {
      // ignore first render
      if (value.blocks.length && value.blocks[0].pageId) return

      // return
      try {
        await mutateAsync({
          pageId: data.id,
          title: value.title || '',
          elements: JSON.stringify(value.blocks),
        })
      } catch (error) {
        console.log('error:', error)
      }
    },
    // delay in ms
    400,
  )

  useEffect(() => {
    debounced(data)
  }, [data, debounced])

  return (
    <div className="w-full h-full">
      <div className="relative min-h-[500px] max-w-4xl py-4 px-4 mx-auto z-0">
        <div className="flex items-center gap-4">
          <span className="text-foreground text-4xl font-bold">
            {journalTitle}
          </span>
          <JournalNav date={page.date} />
        </div>

        <PlateEditor
          className="w-full -mx-6"
          showAddButton
          value={content}
          onChange={(v) => {
            console.log('=======v:', v)

            setData({ ...data, blocks: v })
          }}
        />
      </div>
    </div>
  )
}
