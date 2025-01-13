import { RouterOutputs } from '@penx/api'
import { appEmitter } from '@penx/event'
import { User } from '@penx/model'
import { setAuthorizedUser, setLocalSession } from '@penx/storage'
import { store } from '@penx/store'

type UserInfo = RouterOutputs['user']['loginDesktop']

export async function loginToDesktop(mnemonic: string, user: UserInfo) {
  //
}
