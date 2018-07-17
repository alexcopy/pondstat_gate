import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVkGroupMySuffix } from 'app/shared/model/vkbot/vk-group-my-suffix.model';

type EntityResponseType = HttpResponse<IVkGroupMySuffix>;
type EntityArrayResponseType = HttpResponse<IVkGroupMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class VkGroupMySuffixService {
    private resourceUrl = SERVER_API_URL + 'vkbot/api/vk-groups';
    private resourceSearchUrl = SERVER_API_URL + 'vkbot/api/_search/vk-groups';

    constructor(private http: HttpClient) {}

    create(vkGroup: IVkGroupMySuffix): Observable<EntityResponseType> {
        return this.http.post<IVkGroupMySuffix>(this.resourceUrl, vkGroup, { observe: 'response' });
    }

    update(vkGroup: IVkGroupMySuffix): Observable<EntityResponseType> {
        return this.http.put<IVkGroupMySuffix>(this.resourceUrl, vkGroup, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVkGroupMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVkGroupMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVkGroupMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
