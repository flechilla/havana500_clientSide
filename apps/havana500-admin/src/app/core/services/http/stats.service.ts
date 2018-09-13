import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';

import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StatsService implements OnInit {
  private statsUrl = environment.apiUrl + 'stats';
    
  

    constructor(private http: HttpClient){
    }
    ngOnInit(){}

    getArticleCount(amountOfDays: number) : Observable<number> {
        return  this.http.get<number>(`${this.statsUrl}/GetTotalNewArticles/?lastDays=${amountOfDays}`);      
      }
}