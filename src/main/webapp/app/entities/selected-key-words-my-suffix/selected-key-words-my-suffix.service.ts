import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SelectedKeyWordsMySuffix } from './selected-key-words-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SelectedKeyWordsMySuffix>;

@Injectable()
export class SelectedKeyWordsMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'vkbot/api/selected-key-words';

    constructor(private http: HttpClient) { }

    create(selectedKeyWords: SelectedKeyWordsMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(selectedKeyWords);
        return this.http.post<SelectedKeyWordsMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(selectedKeyWords: SelectedKeyWordsMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(selectedKeyWords);
        return this.http.put<SelectedKeyWordsMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SelectedKeyWordsMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SelectedKeyWordsMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SelectedKeyWordsMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SelectedKeyWordsMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SelectedKeyWordsMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SelectedKeyWordsMySuffix[]>): HttpResponse<SelectedKeyWordsMySuffix[]> {
        const jsonResponse: SelectedKeyWordsMySuffix[] = res.body;
        const body: SelectedKeyWordsMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SelectedKeyWordsMySuffix.
     */
    private convertItemFromServer(selectedKeyWords: SelectedKeyWordsMySuffix): SelectedKeyWordsMySuffix {
        const copy: SelectedKeyWordsMySuffix = Object.assign({}, selectedKeyWords);
        return copy;
    }

    /**
     * Convert a SelectedKeyWordsMySuffix to a JSON which can be sent to the server.
     */
    private convert(selectedKeyWords: SelectedKeyWordsMySuffix): SelectedKeyWordsMySuffix {
        const copy: SelectedKeyWordsMySuffix = Object.assign({}, selectedKeyWords);
        return copy;
    }
}
