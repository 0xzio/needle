// // import { fetch } from '@tauri-apps/plugin-http'
// import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
// import { createTRPCReact } from '@trpc/react-query'
// import superjson from 'superjson'
// import type { AppRouter } from '@penx/api'
// import { BASE_URL } from '@penx/constants'
// import { getHeaders } from './getHeaders'

// console.log('======`${BASE_URL}/api/trpc`:', `${BASE_URL}/api/trpc`)

// export const api = createTRPCProxyClient<AppRouter>({
//   transformer: superjson,
//   links: [
//     httpBatchLink({
//       // fetch: fetch,
//       url: `${BASE_URL}/api/trpc`,
//       // async headers() {
//       //   return await getHeaders()
//       // },
//     }),
//   ],
// })

// export const trpc = createTRPCReact<AppRouter>()

import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import superjson from 'superjson'
import type { AppRouter } from '@penx/api'
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

export const api = createTRPCClient<AppRouter>({
  links: [link],
})

export const trpc = createTRPCReact<AppRouter>({})

export const trpcClient = trpc.createClient({
  links: [link],
})
