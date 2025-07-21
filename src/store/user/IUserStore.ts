export interface IUserState {
  loading: boolean;
  accessToken: string | null;
  user: IUser | null;
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IUserStore extends IUserState {
  setState(type: keyof IUserState, value: any): void;
  resetState(type: keyof IUserState, value?: any): void;
  setUser(user: IUser, accessToken: string): void;
  logout(): void;
  isAuthenticated(): boolean;
}
