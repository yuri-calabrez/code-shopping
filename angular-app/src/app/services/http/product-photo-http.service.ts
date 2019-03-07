import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable'
import { Product, ProductPhoto } from 'src/app/models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductPhotoHttpService {

  constructor(private http: HttpClient) { }

  list(productId: number): Observable<{product: Product, photos: ProductPhoto[]}> {
    return this.http
    .get<{data: any}>(this.getBaseUrl(productId))
    .pipe(
      map(response => response.data)
    )
  }

  create(productId: number, files: FileList): Observable<{product: Product, photos: ProductPhoto[]}> {
    const formData = new FormData()
    const filesArray = Array.from(files)

    filesArray.forEach(file => {
      formData.append('photos[]', file)
    })

    return this.http
      .post<any>(this.getBaseUrl(productId), formData)
  }

  update(productId: number, photoId: number, file: File): Observable<ProductPhoto> {
    const formData = new FormData()
    formData.append('photo', file)
    formData.append('_method', 'PUT')
    return this.http
      .post<any>(this.getBaseUrl(productId, photoId), formData)
      .pipe(
        map(response => response.data)
      )
  }

  destroy(productId: number, photoId: number): Observable<any> {
    return this.http.delete<any>(this.getBaseUrl(productId, photoId))
  }

  getBaseUrl(productId: number, photoId: number = null): string {
    let baseUrl = `${environment.api.url}/products/${productId}/photos`
    if (photoId) {
      baseUrl += `/${photoId}`
    }
    return baseUrl
  }
}
