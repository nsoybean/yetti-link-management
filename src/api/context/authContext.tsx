import { createContext, useMemo, useState } from 'react'
import { IAccessToken, AuthStateEnum } from '../../types/index'

type AuthDataType = {
  accessToken: string
  email: string
  picture: string
  expiresIn: number
  expiresAt: number
  tokenType: string
}

const defaultAuthData: AuthDataType = {
  accessToken: '',
  email: '',
  picture: '',
  expiresIn: 0,
  expiresAt: 0,
  tokenType: '',
}

export function parseTokenFromUrl(urlHash: string): IAccessToken {
  const fragments = urlHash.substring(urlHash.indexOf('#') + 1)
  const params = new URLSearchParams(fragments)

  const token = params.get('access_token')
  const token_type = params.get('token_type')
  const expires_in = Number(params.get('expires_in'))
  const email = params.get('email')
  const picture = params.get('picture')

  const result: IAccessToken = {
    email: email ?? '',
    accessToken: token ?? '',
    expiresIn: expires_in ?? 0,
    expiresAt: expires_in ?? 0,
    tokenType: token_type ?? '',
    picture: picture ?? '',
  }
  return result
}

export function saveTokenFromUrl(hashUrl: string) {
  const parsedToken = parseTokenFromUrl(hashUrl)

  if (parsedToken) {
    const calculatedExpiresAt =
      Number(Math.round(Date.now() / 1000)) + parsedToken.expiresIn
    parsedToken.expiresAt = calculatedExpiresAt
    localStorage.setItem('token', JSON.stringify(parsedToken))
  }
}

export const AuthContext = createContext<{
  authToken: AuthDataType
  setAuthToken: React.Dispatch<React.SetStateAction<IAccessToken>>
  authState: AuthStateEnum
}>({
  authToken: defaultAuthData,
  setAuthToken: () => {},
  authState: AuthStateEnum.UNAUTHENTICATED,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<IAccessToken>({
    accessToken: '',
    email: '',
    picture: '',
    expiresIn: 0,
    expiresAt: 0,
    tokenType: '',
  })
  const [authState, setAuthState] = useState<AuthStateEnum>(
    AuthStateEnum.UNAUTHENTICATED,
  ) // default to 'false'

  useMemo(() => {
    const url = window.location.href
    if (url.includes('access_token')) {
      saveTokenFromUrl(url)
      const userData = parseTokenFromUrl(url)
      setAuthState(AuthStateEnum.AUTHENTICATED) // set to 'AUTHENTICATED' after user signed in via auth provider
      setAuthToken(userData)
      // clear local window url
      window.history.replaceState('', '', '/saves')
    } else {
      const localStorageTokenRaw = localStorage.getItem('token')

      // if no token in local storage
      if (!localStorageTokenRaw) {
        setAuthState(AuthStateEnum.UNAUTHENTICATED)
        return
      } else {
        // validate token expiry if token in local storage
        const localStorageTokenObj: IAccessToken =
          JSON.parse(localStorageTokenRaw)
        const tokenExpiryDate = new Date(localStorageTokenObj.expiresAt * 1000)
        const currDate = new Date()
        // if expired
        if (currDate >= tokenExpiryDate) {
          setAuthState(AuthStateEnum.SESSION_EXPIRED)
          return
        } else {
          setAuthState(AuthStateEnum.AUTHENTICATED) // ok
          setAuthToken(localStorageTokenObj)
          return
        }
      }
    }
  }, [])

  const authCtx = useMemo(
    () => ({ authToken, setAuthToken, authState }),
    [authToken, setAuthToken, authState],
  )
  return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
}
