import BackendPath from '../constants/backend'

export const BASE_BACKEND_URL = new BackendPath().getBackendPath()

class AuthAPI {
  static loginWithGoogle = () => {
    return `${BASE_BACKEND_URL}/google`
  }

  static getGoogleLoginUrl = () => {
    return `${BASE_BACKEND_URL}/login/google`
  }
}

export default AuthAPI
