import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITankMySuffix } from 'app/shared/model/pond/tank-my-suffix.model';

type EntityResponseType = HttpResponse<ITankMySuffix>;
type EntityArrayResponseType = HttpResponse<ITankMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TankMySuffixService {
    private resourceUrl = SERVER_API_URL + 'pond/api/tanks';
    private resourceSearchUrl = SERVER_API_URL + 'pond/api/_search/tanks';

    constructor(private http: HttpClient) {}

    create(tank: ITankMySuffix): Observable<EntityResponseType> {
        return this.http.post<ITankMySuffix>(this.resourceUrl, tank, { observe: 'response' });
    }

    update(tank: ITankMySuffix): Observable<EntityResponseType> {
        return this.http.put<ITankMySuffix>(this.resourceUrl, tank, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITankMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITankMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITankMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
