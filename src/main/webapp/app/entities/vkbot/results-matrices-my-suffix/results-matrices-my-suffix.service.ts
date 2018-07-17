import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IResultsMatricesMySuffix } from 'app/shared/model/vkbot/results-matrices-my-suffix.model';

type EntityResponseType = HttpResponse<IResultsMatricesMySuffix>;
type EntityArrayResponseType = HttpResponse<IResultsMatricesMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ResultsMatricesMySuffixService {
    private resourceUrl = SERVER_API_URL + 'vkbot/api/results-matrices';
    private resourceSearchUrl = SERVER_API_URL + 'vkbot/api/_search/results-matrices';

    constructor(private http: HttpClient) {}

    create(resultsMatrices: IResultsMatricesMySuffix): Observable<EntityResponseType> {
        return this.http.post<IResultsMatricesMySuffix>(this.resourceUrl, resultsMatrices, { observe: 'response' });
    }

    update(resultsMatrices: IResultsMatricesMySuffix): Observable<EntityResponseType> {
        return this.http.put<IResultsMatricesMySuffix>(this.resourceUrl, resultsMatrices, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IResultsMatricesMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IResultsMatricesMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IResultsMatricesMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
