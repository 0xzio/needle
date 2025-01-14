import { get } from 'idb-keyval'

export async function getHeaders() {
  const token = await get('PENX_TOKEN')
  // console.log('==========>>>>>>>token:', token)
  return {
    Authorization: token || '',
  }
}
