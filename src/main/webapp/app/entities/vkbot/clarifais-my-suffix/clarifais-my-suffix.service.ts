import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClarifaisMySuffix } from 'app/shared/model/vkbot/clarifais-my-suffix.model';

type EntityResponseType = HttpResponse<IClarifaisMySuffix>;
type EntityArrayResponseType = HttpResponse<IClarifaisMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ClarifaisMySuffixService {
    private resourceUrl = SERVER_API_URL + 'vkbot/api/clarifais';
    private resourceSearchUrl = SERVER_API_URL + 'vkbot/api/_search/clarifais';

    constructor(private http: HttpClient) {}

    create(clarifais: IClarifaisMySuffix): Observable<EntityResponseType> {
        return this.http.post<IClarifaisMySuffix>(this.resourceUrl, clarifais, { observe: 'response' });
    }

    update(clarifais: IClarifaisMySuffix): Observable<EntityResponseType> {
        return this.http.put<IClarifaisMySuffix>(this.resourceUrl, clarifais, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IClarifaisMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClarifaisMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClarifaisMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
