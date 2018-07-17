import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISelectedKeyWordsMySuffix } from 'app/shared/model/vkbot/selected-key-words-my-suffix.model';

type EntityResponseType = HttpResponse<ISelectedKeyWordsMySuffix>;
type EntityArrayResponseType = HttpResponse<ISelectedKeyWordsMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class SelectedKeyWordsMySuffixService {
    private resourceUrl = SERVER_API_URL + 'vkbot/api/selected-key-words';
    private resourceSearchUrl = SERVER_API_URL + 'vkbot/api/_search/selected-key-words';

    constructor(private http: HttpClient) {}

    create(selectedKeyWords: ISelectedKeyWordsMySuffix): Observable<EntityResponseType> {
        return this.http.post<ISelectedKeyWordsMySuffix>(this.resourceUrl, selectedKeyWords, { observe: 'response' });
    }

    update(selectedKeyWords: ISelectedKeyWordsMySuffix): Observable<EntityResponseType> {
        return this.http.put<ISelectedKeyWordsMySuffix>(this.resourceUrl, selectedKeyWords, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISelectedKeyWordsMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISelectedKeyWordsMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISelectedKeyWordsMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
