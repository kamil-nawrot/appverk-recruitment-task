import { UserModel } from './user.model';

export type CredentialsModel = Pick<UserModel, 'email' | 'password'>
