import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../base';
import { ContentTag, HavanaEnvironment } from '../../models';

@Injectable({ providedIn: 'root' })
export class ContentTagService extends BaseCrudService<ContentTag> {
  constructor(
    private environment: HavanaEnvironment,
    private httpClient: HttpClient,
    protected snack: MatSnackBar
  ) {
    super(environment.apiUrl + 'tag', httpClient, snack);
  }
}
