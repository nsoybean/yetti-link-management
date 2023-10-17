class Auth {
  accessToken!: string
  email!: string
  expiresIn!: number
  tokenType!: string
  expiresAt!: number
  picture!: string

  static getAccessToken(): string | null {
    const fetchedToken = localStorage.getItem('token')
    if (fetchedToken) {
      const access_token: string = JSON.parse(fetchedToken).accessToken
      return access_token
    }
    return null
  }

  static getAuthObj(): { [key: string]: any } | null {
    const fetchedToken = localStorage.getItem('token')
    if (fetchedToken) {
      return JSON.parse(fetchedToken)
    }
    return null
  }

  static isTokenValid(): boolean {
    // TODO: implement me
    return true
  }
}

export default Auth
