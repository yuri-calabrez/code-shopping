import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ProductInput } from 'src/app/models';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchParams, SearchParamsBuilder } from './http-resource';

@Injectable({
  providedIn: 'root'
})
export class ProductInputHttpService {

  private baseUrl = `${environment.api.url}/inputs`

  constructor(private http: HttpClient) { }

  list(searchParams: SearchParams): Observable<{data: Array<ProductInput>, meta: any}> {
    const token = window.localStorage.getItem('token')
    const sParams = new SearchParamsBuilder(searchParams).makeObject()
    const params = new HttpParams({
      fromObject: (<any>sParams)
    })
    return this.http.get<{data: Array<ProductInput>, meta: any}>(this.baseUrl, {
      params,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  get(id: number): Observable<ProductInput> {
    return this.http
      .get<{data: ProductInput}>(`${this.baseUrl}/${id}`)
      .pipe(
        map(response => response.data)
      )
  }

  create(data: {product_id: number, amount: number}): Observable<ProductInput> {
    return this.http
      .post<{data: ProductInput}>(this.baseUrl, data)
      .pipe(
        map(response => response.data)
      )
  }
}
