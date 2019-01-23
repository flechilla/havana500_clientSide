import { Injectable } from '@angular/core';
import { BaseCrudService, User } from '@hav500workspace/shared';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from 'libs/shared/src/lib/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UserService extends BaseCrudService<User> {
  
  private checkCodeUrl = this.url + '/confirmEmail';

  constructor(private httpClient: HttpClient, protected snack: MatSnackBar) {
    super(environment.apiUrl + 'account', httpClient, snack);
   }

   /**
    * Check if the user has a valid code given its
    * Id and the code
    *
    * @param {string} userId
    * @param {string} code
    * @returns {Observable<boolean>}
    * @memberof UserService
    */
   checkUserCode(userId: string, code: string): Observable<boolean> {
    const url = this.checkCodeUrl + '?userId='
                + userId + '&code=' + code;
    return this.httpClient.get<boolean>(url);
  }
}
