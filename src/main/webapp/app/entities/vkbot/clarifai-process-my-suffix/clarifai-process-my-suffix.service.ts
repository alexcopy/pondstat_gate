import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClarifaiProcessMySuffix } from 'app/shared/model/vkbot/clarifai-process-my-suffix.model';

type EntityResponseType = HttpResponse<IClarifaiProcessMySuffix>;
type EntityArrayResponseType = HttpResponse<IClarifaiProcessMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ClarifaiProcessMySuffixService {
    private resourceUrl = SERVER_API_URL + 'vkbot/api/clarifai-processes';
    private resourceSearchUrl = SERVER_API_URL + 'vkbot/api/_search/clarifai-processes';

    constructor(private http: HttpClient) {}

    create(clarifaiProcess: IClarifaiProcessMySuffix): Observable<EntityResponseType> {
        return this.http.post<IClarifaiProcessMySuffix>(this.resourceUrl, clarifaiProcess, { observe: 'response' });
    }

    update(clarifaiProcess: IClarifaiProcessMySuffix): Observable<EntityResponseType> {
        return this.http.put<IClarifaiProcessMySuffix>(this.resourceUrl, clarifaiProcess, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IClarifaiProcessMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClarifaiProcessMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClarifaiProcessMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
