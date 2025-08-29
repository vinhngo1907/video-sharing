import axios from "axios";
// import { AuthorizationHeader } from "./request.extras";
import { AuthorizationHeader } from "../utils/setAuthToken";
import { API_BASE_URL, API_BASE_URL_USERS } from "../contexts/constants";
import type { UserDetails } from "../redux/types/user";
import type { IUserLogin, IUserRegister } from "../utils/TypeScript";

// Types
// export interface NewUser {
//     username: string;
//     password: string;
//     firstName?: string;
//     lastName?: string;
//     profilePicture?: string;
// }

// export interface LoginUser {
//     username: string;
//     password: string;
// }

export interface User {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
}

export interface AuthResponse extends User {
    jwtToken: string;
}

// register a new user account
export const register = async (newUser: IUserRegister): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(API_BASE_URL + "register", {
            ...newUser,
        });

        const data = response.data;

        localStorage.setItem(
            "user",
            JSON.stringify({
                username: data.username,
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                profilePicture: data.profilePicture,
            })
        );

        localStorage.setItem("token", data.jwtToken);

        return data;
    } catch (error) {
        throw new Error("Bad request");
    }
};

// sign in
export const login = async (user: IUserLogin): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(API_BASE_URL + "login", user);
        const data = response.data;

        localStorage.setItem(
            "user",
            JSON.stringify({
                id: data.id,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                profilePicture: data.profilePicture,
            })
        );

        localStorage.setItem("token", data.jwtToken);

        return data;
    } catch (error) {
        throw new Error("Bad request");
    }
};

// update users data
export const updateUser = async (idUser: string, user: Partial<User>): Promise<User> => {
    try {
        const response = await axios.put<User>(API_BASE_URL_USERS + idUser, user, {
            headers: AuthorizationHeader(),
        });
        return response.data;
    } catch (error) {
        throw new Error("Couldn't update user");
    }
};

// Get user data by id
export const getUser = async (idUser: string): Promise<User> => {
    try {
        const response = await axios.get<User>(API_BASE_URL_USERS + idUser);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.message || "Error fetching user");
    }
};

// Get user videos
export const getUserVideos = async (idUser: string): Promise<any[]> => {
    try {
        const response = await axios.get<any[]>(API_BASE_URL_USERS + idUser + "/videos");
        return response.data;
    } catch {
        throw new Error("Error while getting user's videos");
    }
};

// change user password
export const changeUserPassword = async (
    idUser: string,
    currentPassword: string,
    newPassword: string
): Promise<{ message: string }> => {
    try {
        const response = await axios.put<{ message: string }>(
            API_BASE_URL_USERS + idUser + "/password",
            {
                currentPassword,
                newPassword,
            },
            { headers: AuthorizationHeader() }
        );
        return response.data;
    } catch {
        throw new Error("Error while changing password");
    }
};
