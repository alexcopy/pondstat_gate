import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVkPictureMySuffix } from 'app/shared/model/vkbot/vk-picture-my-suffix.model';

type EntityResponseType = HttpResponse<IVkPictureMySuffix>;
type EntityArrayResponseType = HttpResponse<IVkPictureMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class VkPictureMySuffixService {
    private resourceUrl = SERVER_API_URL + 'vkbot/api/vk-pictures';
    private resourceSearchUrl = SERVER_API_URL + 'vkbot/api/_search/vk-pictures';

    constructor(private http: HttpClient) {}

    create(vkPicture: IVkPictureMySuffix): Observable<EntityResponseType> {
        return this.http.post<IVkPictureMySuffix>(this.resourceUrl, vkPicture, { observe: 'response' });
    }

    update(vkPicture: IVkPictureMySuffix): Observable<EntityResponseType> {
        return this.http.put<IVkPictureMySuffix>(this.resourceUrl, vkPicture, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVkPictureMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVkPictureMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVkPictureMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
