export type GithubInfo = {
  installationId: number
  repo: string
  token: string
  refreshToken: string
  tokenExpiresAt: string
  refreshTokenExpiresAt: string
}

export type GoogleInfo = {
  access_token: string
  scope: string
  token_type: string
  expiry_date: number
  refresh_token: string

  id: string
  email: string
  picture: string
}

export type IUser = {
  id: string
  name: string
  displayName: string
  ensName: string
  email: string
  image: string | null
  cover: string
  bio: string
  about: string
  github: any
  google: any
  accounts: Array<{
    id: string
    providerType: string
    providerAccountId: string
    providerInfo: any
    refreshToken: string
    accessToken: string
  }>
}

export class User {
  constructor(public raw: IUser) {}

  get id() {
    return this.raw?.id as string
  }

  get image() {
    return this.raw.image || ''
  }

  get github(): GithubInfo {
    if (typeof this.raw.github === 'string') {
      return JSON.parse(this.raw.github || '{}')
    }
    return (this.raw.github || {}) as GithubInfo
  }

  get repo() {
    return this.github.repo
  }

  get repoOwner() {
    return this.repo.split('/')[0]
  }

  get repoName() {
    return this.repo.split('/')[1]
  }

  get installationId() {
    return this.github.installationId
  }

  get google(): GoogleInfo {
    if (typeof this.raw.google === 'string') {
      return JSON.parse(this.raw.google || '{}')
    }
    return (this.raw.google || {}) as GoogleInfo
  }

  get isSyncWorks() {
    return !!this.repo
  }
}
