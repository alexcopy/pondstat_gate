import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ResultsMatricesMySuffix } from './results-matrices-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ResultsMatricesMySuffix>;

@Injectable()
export class ResultsMatricesMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'vkbot/api/results-matrices';

    constructor(private http: HttpClient) { }

    create(resultsMatrices: ResultsMatricesMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(resultsMatrices);
        return this.http.post<ResultsMatricesMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(resultsMatrices: ResultsMatricesMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(resultsMatrices);
        return this.http.put<ResultsMatricesMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ResultsMatricesMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ResultsMatricesMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ResultsMatricesMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ResultsMatricesMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ResultsMatricesMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ResultsMatricesMySuffix[]>): HttpResponse<ResultsMatricesMySuffix[]> {
        const jsonResponse: ResultsMatricesMySuffix[] = res.body;
        const body: ResultsMatricesMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ResultsMatricesMySuffix.
     */
    private convertItemFromServer(resultsMatrices: ResultsMatricesMySuffix): ResultsMatricesMySuffix {
        const copy: ResultsMatricesMySuffix = Object.assign({}, resultsMatrices);
        return copy;
    }

    /**
     * Convert a ResultsMatricesMySuffix to a JSON which can be sent to the server.
     */
    private convert(resultsMatrices: ResultsMatricesMySuffix): ResultsMatricesMySuffix {
        const copy: ResultsMatricesMySuffix = Object.assign({}, resultsMatrices);
        return copy;
    }
}
