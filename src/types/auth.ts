export interface IAccessToken {
  accessToken: string
  email: string
  expiresIn: number
  tokenType: string
  expiresAt: number
  picture: string
}

export enum AuthStateEnum {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  AUTHENTICATED = 'AUTHENTICATED',
}
