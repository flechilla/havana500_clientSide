import { Injectable } from '@angular/core';
import { BaseCrudService, User } from '@hav500workspace/shared';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from 'libs/shared/src/lib/environments/environment';

@Injectable()
export class UserService extends BaseCrudService<User> {

  constructor(private httpClient: HttpClient, protected snack: MatSnackBar) {
    super(environment.apiUrl + 'account', httpClient, snack);
   }
}
