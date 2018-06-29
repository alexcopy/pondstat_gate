import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ClarifaisMySuffix } from './clarifais-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ClarifaisMySuffix>;

@Injectable()
export class ClarifaisMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'vkbot/api/clarifais';

    constructor(private http: HttpClient) { }

    create(clarifais: ClarifaisMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(clarifais);
        return this.http.post<ClarifaisMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(clarifais: ClarifaisMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(clarifais);
        return this.http.put<ClarifaisMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ClarifaisMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ClarifaisMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ClarifaisMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ClarifaisMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ClarifaisMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ClarifaisMySuffix[]>): HttpResponse<ClarifaisMySuffix[]> {
        const jsonResponse: ClarifaisMySuffix[] = res.body;
        const body: ClarifaisMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ClarifaisMySuffix.
     */
    private convertItemFromServer(clarifais: ClarifaisMySuffix): ClarifaisMySuffix {
        const copy: ClarifaisMySuffix = Object.assign({}, clarifais);
        return copy;
    }

    /**
     * Convert a ClarifaisMySuffix to a JSON which can be sent to the server.
     */
    private convert(clarifais: ClarifaisMySuffix): ClarifaisMySuffix {
        const copy: ClarifaisMySuffix = Object.assign({}, clarifais);
        return copy;
    }
}
