import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { NotificationService } from 'src/app/core/services/notification.service';
import {
    DoNothingAction, LoadConfigAction,
    LoadConfigSuccessAction,
    ConfigActionTypes} from '../actions';
import { ConfigService } from 'src/app/core/services/config.service';

/**
 * Config effects
 */
@Injectable()
export class ConfigEffects {
    constructor(
        private actions$: Actions,
        private notificationService: NotificationService,
        private configService: ConfigService
    ) {
    }
    @Effect()
    loadConfigEffects$: Observable<Action> = this.actions$.pipe(
        ofType<LoadConfigAction>(ConfigActionTypes.LOAD_CONFIG),
        map(() => new LoadConfigSuccessAction(this.configService.getPlaceHolderUrl())),
        catchError(this.processError(`Unable to load config.`))
    );
    private processError(message, action?: Action) {
        return (error) => {
            if (error instanceof HttpErrorResponse && error.status === 400 && error.error && Array.isArray(error.error.errors)) {
                this.notificationService.showErrors(message, error.error.errors);
            } else {
                this.notificationService.showError(message, '');
            }
            return action != null ? of(action) : of(new DoNothingAction());
        };
    }
}
