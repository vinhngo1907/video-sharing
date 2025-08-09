// types/user.ts
export interface UserDetails {
    id: string;
    name: string;
    email: string;
    [key: string]: any;
}

export interface UserState {
    currentUser: UserDetails | null;
    isLoggedIn: boolean;
}
