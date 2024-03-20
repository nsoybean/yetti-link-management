export interface User {
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  isAdmin?: boolean;
  hasPaid?: boolean;
  lastSignIn?: Date;
  lastActiveTimestamp?: number;
}

export interface AuthUser {
  email?: string;
  accessToken?: string;
  tokenType?: string;
  picture?: string;
}
