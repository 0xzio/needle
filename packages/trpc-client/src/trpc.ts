import { fetch } from '@tauri-apps/plugin-http'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import superjson from 'superjson'
import { BASE_URL } from '@penx/constants'
import { getHeaders } from './getHeaders'

const link = httpBatchLink({
  transformer: superjson,
  fetch: fetch,
  url: `${BASE_URL}/api/trpc`,
  async headers() {
    return await getHeaders()
  },
})

export const api: any = createTRPCClient({
  links: [link],
})

export const trpc: any = createTRPCReact({})

export const trpcClient = trpc.createClient({
  links: [link],
})
