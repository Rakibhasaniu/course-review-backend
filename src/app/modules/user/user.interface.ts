import { Model } from "mongoose";

export interface TUser  {
    username: string
    email: string
    passwordChangedAt?: Date;
    password: string
    role: 'admin' | 'user'
  }

export interface UserModel extends Model<TUser>{
    isUserExists(name:string):Promise<TUser>;
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
      ): Promise<boolean>;
      isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
      ): boolean;
}
  