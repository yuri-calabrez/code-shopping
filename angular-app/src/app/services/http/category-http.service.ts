import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/models';
import { map } from 'rxjs/operators'
import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService implements HttpResource<Category> {

  private baseUrl = `${environment.api.url}/categories`

  constructor(private http: HttpClient, private authService: AuthService) { }

  list(searchParams: SearchParams): Observable<{data: Array<Category>, meta: any}> {
    const sParams = new SearchParamsBuilder(searchParams).makeObject()
    const params = new HttpParams({
      fromObject: (<any>sParams)
    })
    return this.http.get<{data: Array<Category>, meta: any}>(this.baseUrl, {params})
  }

  get(id: number): Observable<Category> {
    return this.http
      .get<{data: Category}>(`${this.baseUrl}/${id}`)
      .pipe(
        map(response => response.data)
      )
  }

  create(data: Category): Observable<Category> {
    return this.http.post<{data: Category}>(this.baseUrl, data)
    .pipe(
      map(response => response.data)
    )
  }

  update(id: number, data: Category): Observable<Category> {
    return this.http.put<{data: Category}>(`${this.baseUrl}/${id}`, data)
    .pipe(
      map(response => response.data)
    )
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }


}
