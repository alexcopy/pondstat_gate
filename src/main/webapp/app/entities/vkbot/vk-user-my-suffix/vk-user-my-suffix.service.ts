import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVkUserMySuffix } from 'app/shared/model/vkbot/vk-user-my-suffix.model';

type EntityResponseType = HttpResponse<IVkUserMySuffix>;
type EntityArrayResponseType = HttpResponse<IVkUserMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class VkUserMySuffixService {
    private resourceUrl = SERVER_API_URL + 'vkbot/api/vk-users';
    private resourceSearchUrl = SERVER_API_URL + 'vkbot/api/_search/vk-users';

    constructor(private http: HttpClient) {}

    create(vkUser: IVkUserMySuffix): Observable<EntityResponseType> {
        return this.http.post<IVkUserMySuffix>(this.resourceUrl, vkUser, { observe: 'response' });
    }

    update(vkUser: IVkUserMySuffix): Observable<EntityResponseType> {
        return this.http.put<IVkUserMySuffix>(this.resourceUrl, vkUser, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVkUserMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVkUserMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVkUserMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
