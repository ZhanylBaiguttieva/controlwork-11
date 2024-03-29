import {Model} from "mongoose";


export interface UserFields {
    username: string;
    password: string;
    displayName: string;
    phone: string;
    token: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;