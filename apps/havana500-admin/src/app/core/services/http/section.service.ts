import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseCrudService } from '../../../shared/services/base-crud.service';
import { Section } from '../../models/section.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SectionService extends BaseCrudService<Section> {
  constructor(private httpClient: HttpClient) {
    super(environment.apiUrl + 'section', httpClient);
  }
}
