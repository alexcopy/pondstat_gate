import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISuggestIgnoredMySuffix } from 'app/shared/model/vkbot/suggest-ignored-my-suffix.model';

type EntityResponseType = HttpResponse<ISuggestIgnoredMySuffix>;
type EntityArrayResponseType = HttpResponse<ISuggestIgnoredMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class SuggestIgnoredMySuffixService {
    private resourceUrl = SERVER_API_URL + 'vkbot/api/suggest-ignoreds';
    private resourceSearchUrl = SERVER_API_URL + 'vkbot/api/_search/suggest-ignoreds';

    constructor(private http: HttpClient) {}

    create(suggestIgnored: ISuggestIgnoredMySuffix): Observable<EntityResponseType> {
        return this.http.post<ISuggestIgnoredMySuffix>(this.resourceUrl, suggestIgnored, { observe: 'response' });
    }

    update(suggestIgnored: ISuggestIgnoredMySuffix): Observable<EntityResponseType> {
        return this.http.put<ISuggestIgnoredMySuffix>(this.resourceUrl, suggestIgnored, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISuggestIgnoredMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISuggestIgnoredMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISuggestIgnoredMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
