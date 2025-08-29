// types/user.ts
export interface UserDetails {
    // id: string;
    // name: string;
    // email: string;
    // [key: string]: any;
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
}

export interface UserState {
    currentUser: UserDetails | null;
    isLoggedIn: boolean;
}
