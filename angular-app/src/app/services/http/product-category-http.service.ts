import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable'
import { ProductCategory } from 'src/app/models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {

  constructor(private http: HttpClient) { }

  list(productId: number): Observable<ProductCategory> {
    const token = window.localStorage.getItem('token')
    return this.http.get<{data:ProductCategory}>(this.getBaseUrl(productId), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .pipe(
      map(response => response.data)
    )
  }

  create(productId: number, categoriesId: number[]): Observable<ProductCategory> {
    const token = window.localStorage.getItem('token')
    return this.http.post<{data:ProductCategory}>(this.getBaseUrl(productId), 
      {categories: categoriesId}, 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    .pipe(
      map(response => response.data)
    )
  }

  getBaseUrl(productId: number, categoryId: number = null): string {
    let baseUrl = `${environment.api.url}/products/${productId}/categories`
    if (categoryId) {
      baseUrl += `/${categoryId}`
    }
    return baseUrl
  }
}
