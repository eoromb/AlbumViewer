import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export enum UserActionTypes {
    LOAD_ALL_USERS = '[Albums] Load all users',
    LOAD_ALL_USERS_SUCCESS = '[Albums] Load all users succeed',
    LOAD_ALL_USERS_FAIL = '[Albums] Load all users failed'
}
export class LoadAllUsersAction implements Action {
    readonly type = UserActionTypes.LOAD_ALL_USERS;
}
export class LoadAllUsersSuccessAction implements Action {
    readonly type = UserActionTypes.LOAD_ALL_USERS_SUCCESS;
    constructor(public users: User[]) {
    }
}
export class LoadAllUsersFailAction implements Action {
    readonly type = UserActionTypes.LOAD_ALL_USERS_FAIL;
    constructor() {}
}
export type UserActions = LoadAllUsersAction
    | LoadAllUsersSuccessAction
    | LoadAllUsersFailAction;

