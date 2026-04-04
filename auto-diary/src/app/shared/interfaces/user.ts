export interface User {
    _id: string;
    email: string;
    username: string;
    tel: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
    username: string;
    email: string;
    password: string;
    tel: string;
}