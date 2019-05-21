import { Action } from '@ngrx/store';

export enum ConfigActionTypes {
    LOAD_CONFIG = '[Albums] Load config',
    LOAD_CONFIG_SUCCESS = '[Albums] Load config success'
}
export class LoadConfigAction implements Action {
    readonly type = ConfigActionTypes.LOAD_CONFIG;
}
export class LoadConfigSuccessAction implements Action {
    readonly type = ConfigActionTypes.LOAD_CONFIG_SUCCESS;
    constructor(public placeHolderUrl: string) {
    }
}
export type ConfigActions = LoadConfigAction
    | LoadConfigSuccessAction;

