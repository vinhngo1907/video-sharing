export interface IAlert {
    loading?: boolean
    success?: string | string[]
    errors?: string | string[]
}

export interface IUserLogin {
    username: string
    password: string
}

export interface IUserRegister extends IUserLogin {
    profilePicture?: string
    firstName?: string
    lastName?: string
    cf_password: string
}

export interface IUser extends IUserLogin {
    profilePicture?: string
    firstName?: string
    lastName?: string
    id: string
}

