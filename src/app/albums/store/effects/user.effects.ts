import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UserDataService } from '../../services/user-data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LoadAllUsersAction, LoadAllUsersSuccessAction, DoNothingAction, UserActionTypes } from '../actions';

/**
 * Users effects
 */
@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private notificationService: NotificationService,
        private userDataService: UserDataService
    ) {
    }
    @Effect()
    loadUsersEffect$: Observable<Action> = this.actions$.pipe(
        ofType<LoadAllUsersAction>(UserActionTypes.LOAD_ALL_USERS),
        switchMap(() => this.userDataService.getUsers().pipe(
            map(users => new LoadAllUsersSuccessAction(users)),
            catchError(this.processError(`Unable to load users.`)))),
        catchError(this.processError(`Unable to load users.`))
    );
    processError(message) {
        return (error) => {
            if (error instanceof HttpErrorResponse && error.status === 400 && error.error && Array.isArray(error.error.errors)) {
                this.notificationService.showErrors(message, error.error.errors);
            } else {
                this.notificationService.showError(message, '');
            }
            return of(new DoNothingAction());
        };
    }
}
