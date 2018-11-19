import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HavanaEnvironment, Section } from '../../models';
import { BaseCrudService } from '../base';

@Injectable()
export class SectionService extends BaseCrudService<Section> {
  constructor(
    private environment: HavanaEnvironment,
    private httpClient: HttpClient,
    protected snack: MatSnackBar
  ) {
    super(environment.apiUrl + 'section', httpClient, snack);
  }
}
