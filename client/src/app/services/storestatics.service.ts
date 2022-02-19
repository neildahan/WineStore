import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/base-response.interface';
import { StoreStatics } from '../models/store-statics.interface';

@Injectable({
  providedIn: 'root'
})
export class StorestaticsService {

  private staticsChange = new BehaviorSubject<StoreStatics | null>(null);
  statics$ = this.staticsChange.asObservable();

  constructor(private http:HttpClient) { }

  getStoreStatics() :Observable<StoreStatics>{
    return this.http.get<BaseResponse<StoreStatics>>(environment.baseUrl + "/statics/").pipe(
      map((res) => res.data)
    )
  }

  setStatics(statics: StoreStatics) {
    this.staticsChange.next(statics)
  }

}
