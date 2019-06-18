import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchParams, SearchParamsBuilder } from './http-resource';
import { Observable } from 'rxjs';
import { ChatGroup, User } from 'src/app/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatGroupUserHttpService {

  private baseApi = environment.api.url

  constructor(private http: HttpClient) { }

  list(chatgroupId: number, searchParams: SearchParams): Observable<{data: {chat_group: ChatGroup, users: User[]}, meta: any}> {
    const sParams = new SearchParamsBuilder(searchParams).makeObject();
    const params = new HttpParams({
      'fromObject': (<any>sParams)
    })

    return this.http
      .get<{data: {chat_group: ChatGroup, users: User[]}, meta: any}>(this.getBaseUrl(chatgroupId), {params})
  }

  create(chatGroupId: number, usersId: number[]): Observable<{chat_group: ChatGroup, users: User[]}> {
    return this.http
      .post<{data: {chat_group: ChatGroup, users: User[]}}>(this.getBaseUrl(chatGroupId), {users: usersId})
      .pipe(
        map(response => response.data)
      )
  }

  private getBaseUrl(chatgroupId: number, userId: number = null): string {
    let baseUrl = `${this.baseApi}/chat_groups/${chatgroupId}/users`
    if (userId) {
      baseUrl += `/${userId}`
    }

    return baseUrl
  }
}
