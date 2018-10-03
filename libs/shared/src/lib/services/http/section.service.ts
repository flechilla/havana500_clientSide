import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HavanaEnvironment, Section } from '../../models';
import { BaseCrudService } from '../base';

@Injectable()
export class SectionService extends BaseCrudService<Section> {
  constructor(
    private environment: HavanaEnvironment,
    private httpClient: HttpClient
  ) {
    super(environment.apiUrl + 'section', httpClient);
  }
}
